from fastapi import APIRouter

router = APIRouter()


@router.get("/signup")
async def signup():
    return {"message": "Hello World"}