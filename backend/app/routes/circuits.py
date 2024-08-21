from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from typing import List
from app.models.db_models import Circuit as DBCircuit  # Import the SQLAlchemy model
# Import the Pydantic model
from app.models.pydantic_model import Circuit as PydanticCircuit

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/circuits", response_model=List[PydanticCircuit])
def get_circuits(db: Session = Depends(get_db)):
    circuits = db.query(DBCircuit).all()  # Use the SQLAlchemy model here
    if not circuits:
        raise HTTPException(status_code=404, detail="No circuits found")
    return [PydanticCircuit.from_orm(circuit) for circuit in circuits]


@router.get("/circuits/{circuit_id}", response_model=PydanticCircuit)
def get_circuit(circuit_id: int, db: Session = Depends(get_db)):
    circuit = db.query(DBCircuit).filter(
        DBCircuit.id == circuit_id).first()  # Use the SQLAlchemy model here
    if not circuit:
        raise HTTPException(status_code=404, detail="Circuit not found")
    return PydanticCircuit.from_orm(circuit)
