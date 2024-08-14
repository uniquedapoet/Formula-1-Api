from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Circuit(Base):
    __tablename__ = "circuits"
    circuitId = Column(Integer, primary_key=True)
    circuitRef = Column(String)
    name = Column(String)
    location = Column(String)
    country = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    alt = Column(Float)
    fastest_lap = Column(String, nullable=True)


class Driver(Base):
    __tablename__ = "drivers"
    driverId = Column(Integer, primary_key=True)
    driverRef = Column(String)
    number = Column(String)
    code = Column(String)
    forename = Column(String)
    surname = Column(String)
    dob = Column(String)
    nationality = Column(String)
    podiums = Column(Integer)
    championships = Column(Integer)


class Results(Base):
    __tablename__ = "results"
    index = Column(Integer, primary_key=True)
    raceId = Column(Integer)
    driverId = Column(Integer)   
    constructorId = Column(Integer)
    points = Column(Float) 
    laps = Column(Integer) 
    time = Column(String)  
    fastestLapTime = Column(String)
    driverRef = Column(String)  
    nationality = Column(String)  
    circuitId = Column(Integer)  
    circuitname = Column(String) 
    date = Column(Date)
    year = Column(Integer)