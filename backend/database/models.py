from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str
    email: str


class Token(BaseModel):
    status: int
    access_token: str
    token_type: str
    message: str