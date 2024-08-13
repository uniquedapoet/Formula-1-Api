from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.models.db_models import Driver as DBDriver
from app.models.pydantic_model import Driver as PydanticDriver

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/drivers", response_model=List[PydanticDriver])
def get_drivers(db: Session = Depends(get_db)):
    drivers = db.query(DBDriver).distinct(DBDriver.driverRef).all()  # Use the SQLAlchemy model for Driver
    if not drivers:
        raise HTTPException(status_code=404, detail="No drivers found")
    return [PydanticDriver.from_orm(driver) for driver in drivers]

@router.get("/drivers/{driver}", response_model=PydanticDriver)
def get_driver(driver: str, db: Session = Depends(get_db)):
    driver_data = db.query(DBDriver).filter(DBDriver.driverRef == driver).first()  # Use the SQLAlchemy model for Driver
    if not driver_data:
        raise HTTPException(status_code=404, detail="Driver not found")
    return PydanticDriver.from_orm(driver_data)