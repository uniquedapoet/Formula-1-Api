import os
import csv
import logging

print("Current working directory:", os.getcwd())

try:
    from db_models import Base, Circuit, Driver  # Import your models
except ImportError:
    from app.models.db_models import Base, Circuit, Driver
try:
    from app.models.pydantic_model import Circuit as PydanticCircuit
    from app.models.pydantic_model import Driver as PydanticDriver
except ImportError:
    from pydantic_model import Circuit as PydanticCircuit
    from pydantic_model import Driver as PydanticDriver
try:
    from app.database import engine, SessionLocal
except ImportError:
    from app.database import engine, SessionLocal

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create all tables in the database
Base.metadata.create_all(bind=engine)


def load_circuits_data():
    global circuits_data
    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, "../data/circuits.csv")
    with open(file_path) as f:
        reader = csv.DictReader(f)
        circuits_data = list(reader)

    session = SessionLocal()
    try:
        for row in circuits_data:
            pydantic_circuit = PydanticCircuit(**row)
            db_circuit = Circuit(
                circuitRef=pydantic_circuit.circuitRef,
                name=pydantic_circuit.name,
                location=pydantic_circuit.location,
                country=pydantic_circuit.country,
                lat=pydantic_circuit.lat,
                lng=pydantic_circuit.lng,
                alt=pydantic_circuit.alt,
                fastest_lap=pydantic_circuit.fastest_lap,
            )  # Convert to SQLAlchemy model
            session.add(db_circuit)
        session.commit()
        logger.info("Circuits data loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading circuits data: {e}")
        session.rollback()
    finally:
        session.close()


def load_drivers_data():
    global drivers_data
    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, "../data/drivers.csv")
    with open(file_path) as f:
        reader = csv.DictReader(f)
        drivers_data = list(reader)

    session = SessionLocal()
    try:
        for row in drivers_data:
            pydantic_driver = PydanticDriver(**row)  # Validate data with Pydantic
            db_driver = Driver(
                driverRef=pydantic_driver.driverRef,
                number=pydantic_driver.number,
                code=pydantic_driver.code,
                forename=pydantic_driver.forename,
                surname=pydantic_driver.surname,
                dob=pydantic_driver.dob,
                nationality=pydantic_driver.nationality,
            )  # Convert to SQLAlchemy model
            session.add(db_driver)
        session.commit()
        logger.info("Drivers data loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading drivers data: {e}")
        session.rollback()
    finally:
        session.close()


if __name__ == "__main__":
    load_circuits_data()
    load_drivers_data()
