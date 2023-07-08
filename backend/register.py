"""
Module for user authentication and registration.
"""

import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from decouple import config

from backend.database.master import add_user, get_password, get_userid
from backend.database.models import Token, User

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = config('SECRET_KEY', cast=str)
ALGORITHM = config('ALGORITHM', cast=str)
ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES', cast=int)


def get_password_hash(password):
    """Hashes the provided password using the configured hashing algorithm.

    Args:
        password (str): The password to be hashed.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    """Verifies if the provided plain password matches the hashed password.

    Args:
        plain_password (str): The plain password to be verified.
        hashed_password (str): The hashed password to compare against.

    Returns:
        bool: True if the passwords match, False otherwise.
    """
    try:
        if len(hashed_password) == 0 or hashed_password is None:
            print("Verification false")
            return False
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError as error:
        print("ValueError occurred at verify password: ", error)
        return False
    except TypeError as error:
        print("TypeError occurred at verify password: ", error)
        return False


def create_access_token(data: dict, expires_delta: timedelta) -> str:
    """Creates an access token with the provided data and expiration time.

    Args:
        data (dict): The data to be encoded in the token.
        expires_delta (timedelta): The time delta specifying the expiration time of the token.

    Returns:
        str: The encoded access token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    to_encode.update({"iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def is_token_expired(token: str):
    """Checks if the provided token is expired.

    Args:
        token (str): The token to be checked.

    Returns:
        bool: True if the token is expired, False otherwise.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        expiration_time = datetime.fromtimestamp(payload["exp"])
        current_time = datetime.utcnow()
        return current_time > expiration_time
    except JWTError:
        # Invalid token format or signature
        return True


async def get_user_id_from_token(token: str):
    """
    Gets the user ID from the provided token.

    Args:
        token (str): The token to be decoded.

    Returns:
        str: The user ID decoded from the token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        # Invalid token format or signature
        print("JWTError occurred at get_user_id_from_token")
        return None
    except ValueError:
        # Invalid token format or signature
        print("ValueError occurred at get_user_id_from_token")
        return None
    except TypeError:
        # Invalid token format or signature
        print("TypeError occurred at get_user_id_from_token")
        return None


def check_user(request: Request):
    """Checks the validity of the user's token from the request headers.

    Args:
        request (Request): The FastAPI request object.

    Returns:
        int: The HTTP status code indicating the result of the check. 200 if the token is valid,
        401 if the token is missing or expired.
    """
    token = request.headers.get("Authorization")
    # print(token)
    if not token or is_token_expired(token):
        return 401
    return 200


@router.post("/signup", response_model=Token)
async def register(request: Request, user: User):
    """
    Endpoint for user registration.

    Parameters:
    - request: The incoming request.
    - user: The user data submitted in the request body.

    Returns:
    - If registration is successful:
        - status: HTTP status code indicating success (200).
        - message: A success message ("User created successfully").
        - access_token: The generated access token for the registered user.
        - token_type: The type of the access token.

    - If the username already exists:
        - status: HTTP status code indicating conflict (409).
        - message: An error message ("User already exists").
        - access_token: An empty string.
        - token_type: The type of the access token.

    - If an error occurs during the registration process:
        - Raises an HTTPException with status code 500 and an error detail message.

    """

    try:
        incoming = await request.json()
        user_id = secrets.token_hex(8)
        username = incoming["username"]
        hashed_password = get_password_hash(incoming["password"])
        email_id = incoming["email"]
        first_name = incoming["first_name"]
        last_name = incoming["last_name"]
        phone = incoming["phone"]
        address = incoming["address"]
        city = incoming["city"]
        state = incoming["state"]
        country = incoming["country"]
        zipcode = incoming["zipcode"]
        team_name = incoming["team_name"]
        role = int(incoming["role"])
        skills = incoming["skills"]
        res = await add_user(
            user_id, hashed_password, email_id,
            first_name, last_name, phone, address, city,
            state, country, zipcode, team_name, role
        )
        print("add user: ", res)
        if res == 409:
            # raise HTTPException(
            #         status_code=status.HTTP_409_CONFLICT,
            #         detail="Username already exists",
            #     )
            return {
                "status": 409,
                "message": "User already exists",
                "access_token": "",
                "token_type": "bearer",
            }
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_id}, expires_delta=access_token_expires
        )
        # get_user_id_from_token(access_token)
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "status": 200,
            "message": "User created successfully",
        }
    except Exception as error:
        # print(error)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from error


@router.post("/signin", response_model=Token)
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Endpoint for user login.

    Parameters:
    - request: The incoming request.
    - form_data: The form data submitted in the request body (OAuth2PasswordRequestForm).

    Returns:
    - If login is successful:
        - access_token: The generated access token for the logged-in user.
        - token_type: The type of the access token.

    - If the username or password is incorrect:
        - Raises an HTTPException with status code 401 and an error detail message.

    - If an error occurs during the login process:
        - Raises an HTTPException with status code 500 and an error detail message.

    """

    username = form_data.username
    password = form_data.password
    stored_hashed_password = await get_password(username)
    if stored_hashed_password is None or not verify_password(
            password, stored_hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    result = get_userid(username)
    if result["status"] == "success":
        user_id = result["userid"]
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_id}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer", "status": 200, "message": "Login successful"}

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Internal Server Error",
    )