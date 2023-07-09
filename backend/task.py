from fastapi import APIRouter, Depends, HTTPException, Request
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from datetime import datetime

from backend.user_op import get_current_token
from backend.database.master import get_all_task, get_my_task, insert_task
from backend.register import get_user_id_from_token

router = APIRouter()


async def task_allocator_master(task_name, task_description, task_type, stack, assigned_by, due_date, task_priority):
    """
    This function is used to allocate task to the user.
    Args:
        task_name:
        task_description:
        task_type:
        stack:
        assigned_by:
        due_date:
        task_priority:
    """
    query1 = """
    SELECT team_name, points FROM team WHERE team_id = (SELECT team_id FROM user WHERE user_id = ?)
    """
    query2 = """
    """
    query3 = """
    """
    query4 = """
    """
    query5 = """
    """
    pass


@router.get('/allTaskList')
async def get_all_task_list(token: str = Depends(get_current_token)):
    """
    Returns all the tasks in the database.
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
    task_list = await get_all_task()
    if isinstance(task_list, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from task_list
    if task_list is None or len(task_list) == 0:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No tasks found",
        )
    result = []
    for task in task_list:
        result.append({
            "id": task[0],
            "title": task[1],
            "status": task[2],
            "label": task[3],
            "priority": task[4]
        })

    return {"status": HTTP_200_OK, "message": "Tasks found", "data": result}


@router.get('/myTaskList')
async def get_my_task_list(token: str = Depends(get_current_token)):
    """
    Returns all the tasks done by the user from the database.
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
    task_list = await get_my_task(user_id)
    if isinstance(task_list, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from task_list
    if task_list is None or len(task_list) == 0:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No tasks found",
        )
    result = []
    return {"status": HTTP_200_OK, "message": "Tasks found", "data": task_list}


# @router.get('/taskAllocator')
# async def get_task_allocator(token: str = Depends(get_current_token)):
#     """
#     Returns all the tasks allocated by the user from the database.
#     Algorithm priority: 1. Skills of members
#     Args:
#         token:
#     """
#     user_id = await get_user_id_from_token(token)
#     if user_id is None:
#         raise HTTPException(
#             status_code=HTTP_401_UNAUTHORIZED,
#             detail="Invalid or missing authorization token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#
@router.post('/insertTask')
async def put_task_api(request: Request, token: str = Depends(get_current_token)):
    """
    Insert new task into the database.
    {
        task_name: string;
        task_description: string;
        task_type: string;
        skills: string;
        assigned_by: string;
        due_date: Date;
        task_priority: number;
    }
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
    incoming_data = await request.json()
    task_name = incoming_data.get("task_name")
    task_description = incoming_data.get("task_description")
    task_type = incoming_data.get("task_type")
    stack = incoming_data.get("skills")
    assigned_by = int(incoming_data.get("assigned_by"))
    due_date = incoming_data.get("due_date")
    due_date = due_date.replace('T', ' ').replace('.000Z', '')
    due_date = datetime.strptime(due_date, '%Y-%m-%d %H:%M:%S')
    due_date = due_date.strftime('%Y-%m-%d %H:%M:%S')
    task_priority = int(incoming_data.get("task_priority"))
    print(task_name, task_description, task_type, stack, assigned_by, due_date, task_priority)
    result = await insert_task(task_name, task_description, task_type, stack, assigned_by, due_date, task_priority)
    if isinstance(result, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from result
    return {"status": HTTP_200_OK, "message": "Task inserted successfully"}