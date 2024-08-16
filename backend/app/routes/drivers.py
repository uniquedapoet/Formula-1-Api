from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import SessionLocal
from app.models.db_models import Driver as DBDriver
from app.models.db_models import Circuit as DBCircuit
from app.models.db_models import Results as DBResult
from app.models.pydantic_model import Driver as PydanticDriver
from app.models.pydantic_model import Results as PydanticResult

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/drivers", response_model=List[PydanticDriver])
def get_drivers(db: Session = Depends(get_db)):
    drivers = (
        db.query(DBDriver).distinct(DBDriver.driverRef).all()
    )  # Use the SQLAlchemy model for Driver
    if not drivers:
        raise HTTPException(status_code=404, detail="No drivers found")
    return [PydanticDriver.from_orm(driver) for driver in drivers]
