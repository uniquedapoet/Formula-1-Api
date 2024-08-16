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

import logging


@router.get("/query/results", response_model=List[PydanticResult])
def get_results(
    circuitRef: Optional[str] = Query(None, description="Filter by circuit reference"),
    driver: Optional[str] = Query(None, description="Filter by driver"),
    nationality: Optional[str] = Query(None, description="Filter by nationality"),
    db: Session = Depends(get_db),
):
    query = db.query(DBResult)

    # Apply dynamic filters based on query parameters
    # Apply dynamic filters based on query parameters
    if circuitRef is not None:
        query = query.filter(DBResult.circuitname == circuitRef)
    if driver is not None:
        query = query.filter(DBResult.driverRef == driver)
    if nationality is not None:
        query = query.filter(DBResult.nationality == nationality)

    # Log the generated SQL query
    # logging.info(str(query.statement.compile(compile_kwargs={"literal_binds": True})))

    results = query.distinct()

    # results = query.all()

    if not results:
        raise HTTPException(status_code=404, detail="No results found")

    return [PydanticResult.from_orm(result) for result in results]



@router.get("/drivers", response_model=List[PydanticDriver])
def get_drivers(db: Session = Depends(get_db)):
    drivers = (
        db.query(DBDriver).distinct(DBDriver.driverRef).all()
    )  # Use the SQLAlchemy model for Driver
    if not drivers:
        raise HTTPException(status_code=404, detail="No drivers found")
    return [PydanticDriver.from_orm(driver) for driver in drivers]
