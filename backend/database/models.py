from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
    email: str
    phone_number: str
    address: str
    zipcode: str
    city: str
    state: str
    country: str
    team_name: str
    role: str
    skills: str


class Token(BaseModel):
    status: int
    access_token: str
    token_type: str
    message: str