import os
import csv
import logging

try:
    from db_models import Base, Circuit, Driver  # Import your models
except ImportError:
    from app.models.db_models import Base, Circuit, Driver, Results
try:
    from app.models.pydantic_model import Circuit as pydanticCircuit
    from app.models.pydantic_model import Driver as pydanticDriver
    from app.models.pydantic_model import Results as pydanticResult
except ImportError:
    from pydantic_model import Circuit, Driver, Results
try:
    from app.database import engine, SessionLocal
except ImportError:
    from app.database import engine, SessionLocal

# from models.pydantic_model import Circuit as pydanticCircuit, Driver as pydanticDriver, Results as pydanticResult
# from database import engine, SessionLocal
# from models.db_models import Base, Circuit, Driver, Results

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
            pydantic_circuit = pydanticCircuit(**row)
            db_circuit = Circuit(
                circuitRef=pydantic_circuit.circuitRef,
                name=pydantic_circuit.name,
                location=pydantic_circuit.location,
                country=pydantic_circuit.country,
                lat=pydantic_circuit.lat,
                lng=pydantic_circuit.lng,
                alt=pydantic_circuit.alt,
                url=pydantic_circuit.url,
                circuitLength=pydantic_circuit.circuitLength,
                fastestDriver=pydantic_circuit.fastestDriver,
                fastestYear=pydantic_circuit.fastestYear,
                laps=pydantic_circuit.laps,
                raceDistance=pydantic_circuit.raceDistance,
                fastestLapTime=pydantic_circuit.fastestLapTime
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
            pydantic_driver = pydanticDriver(
                **row)  # Validate data with Pydantic
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


def load_results_data():
    global results_data
    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, "../data/race_results.csv")
    with open(file_path) as f:
        reader = csv.DictReader(f)
        results_data = list(reader)
    session = SessionLocal()
    try:
        for row in results_data:
            logger.debug(f"Processing row: {row}")

            # Check if 'year' is in the row
            if 'year' not in row:
                logger.warning(f"Missing 'year' in row: {row}")
                continue
            pydantic_result = pydanticResult(**row)
            db_result = Results(
                raceId=pydantic_result.raceId,
                driverId=pydantic_result.driverId,
                constructorId=pydantic_result.constructorId,
                points=pydantic_result.points,
                laps=pydantic_result.laps,
                time=pydantic_result.time,
                fastestLapTime=pydantic_result.fastestLapTime,
                driverRef=pydantic_result.driverRef,
                nationality=pydantic_result.nationality,
                circuitId=pydantic_result.circuitId,
                circuitname=pydantic_result.circuitname,
                date=pydantic_result.date,
                year=pydantic_result.year,
                seasonWins=pydantic_result.seasonWins
            )
            session.merge(db_result)
        session.commit()
        logger.info("Results data loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading results data: {e}")
        session.rollback()
    finally:
        session.close()


if __name__ == "__main__":
    load_circuits_data()
    load_drivers_data()
    load_results_data()
