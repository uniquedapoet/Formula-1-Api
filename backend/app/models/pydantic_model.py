from pydantic import BaseModel, Field


class Circuit(BaseModel):
    circuitId: int
    circuitRef: str
    name: str
    location: str
    country: str
    lat: float
    lng: float
    alt: float
    fastest_lap: str = Field(default=None, description="Fastest lap time")

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
        )


class Driver(BaseModel):
    driverId: int
    driverRef: str
    number: str
    code: str
    forename: str
    surname: str
    dob: str
    nationality: str
    podiums: int = Field(default=0, description="Number of podiums")
    championships: int = Field(default=0, description="Number of championships won")

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
