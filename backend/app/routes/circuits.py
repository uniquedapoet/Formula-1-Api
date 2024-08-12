from fastapi import APIRouter, Path
from app.models.pydantic_model import Circuit
import pandas as pd
from typing import List

router = APIRouter()

@router.get("/circuits", response_model=List[Circuit])
def get_circuits():
    df = pd.read_csv(
        "../backend/data/circuits.csv"
    )
    circuits = [Circuit.from_data(row) for _, row in df.iterrows()]
    return circuits

@router.get("/circuits/{circuit_id}", response_model=Circuit)
def get_circuit(
    circuit_id: int = Path(..., description="The ID of the circuit to retrieve")
):
    df = pd.read_csv("../backend/data/circuits.csv")
    circuit_data = df[df["circuitId"] == circuit_id].iloc[0]
    return Circuit.from_data(circuit_data)