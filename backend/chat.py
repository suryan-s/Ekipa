from fastapi import APIRouter, Depends, HTTPException, Request
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR

from backend.database.master import get_message, put_message
from backend.register import get_user_id_from_token
from backend.user_op import get_current_token

router = APIRouter()


@router.post("/postMessage")
async def post_chat(request: Request, token: str = Depends(get_current_token)):
    """
    Save the user message to the database.
    Args:
        request:
        token:
    """
    user_id = await get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    incoming = await request.json()
    incoming_message = incoming["message"]
    result = await put_message(user_id, incoming_message)
    if isinstance(result, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from result
    return {"value": result}


@router.get("/getMessage")
async def get_chat(token: str = Depends(get_current_token)):
    """
    Returns all the messages from the database.
    Args:
        token:
    """
    user_id = await get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    result = await get_message()
    if isinstance(result, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from result
    return {"value": result}