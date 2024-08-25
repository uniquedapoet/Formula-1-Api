import logging
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text as sqltext
from app.database import SessionLocal
from typing import List, Optional
from app.models.db_models import Results as DBResult  # Import the SQLAlchemy model
# Import the Pydantic model
from app.models.pydantic_model import Results as PydanticResults


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/results", response_model=List[PydanticResults])
def get_results(db: Session = Depends(get_db)):
    query = sqltext("""         
        SELECT DISTINCT ON (date) *
        FROM results
    """)
    results = db.execute(query).fetchall()
    if not results:
        raise HTTPException(status_code=404, detail="No results found")
    return [PydanticResults.from_orm(result) for result in results]


@router.get("/results/{date}", response_model=PydanticResults)
def get_result_date(date: str, db: Session = Depends(get_db)):
    results = db.query(DBResult).filter(DBResult.date == date).distinct()
    if not results:
        raise HTTPException(status_code=404, detail="Result not found")
    return [PydanticResults.from_orm(result) for result in results]


@router.get("/results/driver/{driver}", response_model=List[PydanticResults])
def get_result_driver(driver: str, db: Session = Depends(get_db)):
    query = sqltext("""  
        SELECT * FROM results
        WHERE "driverRef" = :driverRef;
    """)
    results = db.execute(query, {"driverRef": driver}).fetchall()
    if not results:
        raise HTTPException(status_code=404, detail="Result not found")

    return [PydanticResults.from_orm(result) for result in results]


@router.get("/results/years/{year}", response_model=List[PydanticResults])
def get_result_year(year: int, db: Session = Depends(get_db)):
    query = sqltext("""  
        SELECT DISTINCT ON (circuitname) *
        FROM results
        WHERE year = :year
        ORDER BY circuitname
    """)
    results = db.execute(query, {"year": year}).fetchall()
    if not results:
        raise HTTPException(status_code=404, detail="Result not found")

    return [PydanticResults.from_orm(result) for result in results]


@router.get("/query/results", response_model=List[PydanticResults])
def get_results(
    circuitRef: Optional[str] = Query(
        None, description="Filter by circuit reference"),
    driver: Optional[str] = Query(None, description="Filter by driver"),
    nationality: Optional[str] = Query(
        None, description="Filter by nationality"),
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

    return [PydanticResults.from_orm(result) for result in results]
