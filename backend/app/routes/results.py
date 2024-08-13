from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from typing import List
from app.models.db_models import Results as DBResult  # Import the SQLAlchemy model
from app.models.pydantic_model import Results as PydanticResults  # Import the Pydantic model


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/results", response_model=List[PydanticResults])
def get_results(db: Session = Depends(get_db)):
    results = db.query(DBResult).limit(500).all()  
    if not results:
        raise HTTPException(status_code=404, detail="No results found")
    return [PydanticResults.from_orm(result) for result in results]


@router.get("/results/{date}", response_model=PydanticResults)
def get_result(date: str, db: Session = Depends(get_db)):
    results = db.query(DBResult).filter(DBResult.date == date).all()
    if not results:
        raise HTTPException(status_code=404, detail="Result not found")
    return [PydanticResults.from_orm(result) for result in results]
