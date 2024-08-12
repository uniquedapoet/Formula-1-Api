from fastapi import APIRouter, Path
from app.models.pydantic_model import Results
import pandas as pd
from typing import List

router = APIRouter()

@app.get("/results", response_model=List[Results])
def get_results():
    df 
