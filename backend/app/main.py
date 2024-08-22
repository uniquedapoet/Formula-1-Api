from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import circuits, drivers, results
from app.data_loader import load_circuits_data, load_drivers_data, load_results_data
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
import uvicorn
import sys, os
from . import last_load_time  # Import the variable from __init__.py

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(circuits.router)
app.include_router(drivers.router)
app.include_router(results.router)


@app.get("/")
def read_root():
    return {"message": "Hello World"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    global last_load_time
    start_time = datetime.now()
    print("Starting up...", start_time.hour)
   
    # Check if an hour has passed since the last load time
    if start_time - last_load_time >= timedelta(hours=1):
        load_circuits_data()
        load_drivers_data()
        load_results_data()
        last_load_time = datetime.now()  # Update the global variable
        print("Data loaded!")
    else:
        print("Data already loaded within the last hour.")
    
    yield


app.router.lifespan_context = lifespan

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
