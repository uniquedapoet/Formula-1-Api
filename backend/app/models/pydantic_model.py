from pydantic import BaseModel, Field, ValidationError
from datetime import date as Date
from typing import Optional


class Circuit(BaseModel):
    circuitId: int = Field(default=0, description="Circuit ID")
    circuitRef: str = Field(default="", description="Circuit reference")
    name: str = Field(default="", description="Circuit name")
    location: str = Field(default="", description="Circuit location")
    country: str = Field(default="", description="Circuit country")
    lat: float = Field(default=0.0, description="Circuit latitude")
    lng: float = Field(default=0.0, description="Circuit longitude")
    alt: float = Field(default=0.0, description="Circuit altitude")
    url: str = Field(default="", description="Circuit URL")
    circuitLength: float = Field(default=0.0, description="Circuit length in KM")
    fastestDriver: str = Field(default=None, description="Fastest driver")
    fastestYear: float = Field(default=None, description="Fastest year")
    laps: float = Field(default=None, description="Laps")
    raceDistance: float = Field(default=None, description='Race Distance')
    fastestLapTime: float = Field(default=None, description="Fastest lap time")

    @classmethod
    def from_data(cls, data):
        """Class method to create a circuit instance from raw data"""
        return cls(
            circuitId=data["circuitId"],
            circuitRef=data["circuitRef"],
            name=data["name"],
            location=data["location"],
            country=data["country"],
            lat=data["lat"],
            lng=data["lng"],
            alt=data["alt"],
            url=data["url"],
            circuitLength=data["circuitLength(KM)"],
            fastestDriver=data["fastestDriver"],
            fastestYear=data["fastestYear"],
            laps=data["laps"],
            raceDistance=data["raceDistance"],
            fastestLapTime=data["fastestLapTime"]
        )

    class Config:
        orm_mode = True


class Driver(BaseModel):
    driverId: int = Field(default=0, description="Driver ID")
    driverRef: str = Field(default="", description="Driver reference")
    number: str = Field(default="", description="Driver number")
    code: str = Field(default="", description="Driver code")
    forename: str = Field(default="", description="Driver forename")
    surname: str = Field(default="", description="Driver surname")
    dob: str = Field(default="", description="Driver date of birth")
    nationality: str = Field(default="", description="Driver nationality")

    @classmethod
    def from_data(cls, data):
        """Class method to create a driver instance from raw data"""
        # championships = cls.get_championships(data)
        # podiums = cls.get_podiums(data)
        return cls(
            driverId=data["driverId"],
            driverRef=data["driverRef"],
            number=data["number"],
            code=data["code"],
            forename=data["forename"],
            surname=data["surname"],
            dob=data["dob"],
            nationality=data["nationality"],
            # podiums=podiums,
            # championships=championships
        )

    class Config:
        orm_mode = True


class Results(BaseModel):
    raceId: int = Field(default=0, description="Race ID")
    driverId: str = Field(default="", description="Driver ID")
    constructorId: str = Field(default="", description="Constructor ID")
    points: float = Field(default=0.0, description="Points")
    laps: int = Field(default=0, description="Laps")
    time: str = Field(default="", description="Time")
    fastestLapTime: str = Field(default="", description="Fastest lap time")
    driverRef: str = Field(default="", description="Driver reference")
    nationality: str = Field(default="", description="Driver nationality")
    circuitId: int = Field(default=0, description="Circuit ID")
    circuitname: str = Field(default="", description="Circuit name")
    date: Date = Field(default=Date.today(), description="Date of the Race")
    year: Optional[int] = Field(default=0, description="Year of the Race")

    @classmethod
    def from_data(cls, data):
        """Class method to create a driver instance from raw data"""
        try:
            return cls(
                raceID=data["raceId"],
                driverId=data["driverId"],
                constructorId=data["constructorId"],
                points=data["points"],
                laps=data["laps"],
                time=data["time"],
                fastestLapTime=data["fastestLapTime"],
                driverRef=data["driverRef"],
                nationality=data["nationality"],
                circuitId=data["circuitId"],
                circuitname=data["circuitname"],
                date=data["date"],
                year=data["year"]
            )
        except ValidationError as e:
            print(f"Validation error: {e}")
            print(f"Problematic data: {data}")
            raise

    class Config:
        orm_mode = True
