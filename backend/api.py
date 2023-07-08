from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND

from backend.database.master import get_roles
from backend.register import get_user_id_from_token

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/register/signin")


async def get_current_token(token: str = Depends(oauth2_scheme)):
    """
    returns the current token.
    :param token:
    :return: token
    """
    if not token:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token


@router.get("/roles")
# async def get_roles_api(token: str = Depends(get_current_token)):
async def get_roles_api():
    """
    Returns the roles from database.
    Args:
        token:
    """
    # user_id = await get_user_id_from_token(token)
    # if user_id is None:
    #     raise HTTPException(
    #         status_code=HTTP_401_UNAUTHORIZED,
    #         detail="Invalid or missing authorization token",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    result = await get_roles()
    if isinstance(result, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from result
    return {"value": result}