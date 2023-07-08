from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/register/signin")
router = APIRouter()


@router.get('/allTaskList')
async def get_all_task_list(token: str = Depends(get_current_token)):
    """
    Returns all the tasks in the database.
    Args:
        token:
    """
    pass