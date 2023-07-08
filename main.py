from backend import app


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Path: main.py
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)