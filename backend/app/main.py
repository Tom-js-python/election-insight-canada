from fastapi import FastAPI
from app.api import ridings

app = FastAPI()

app.include_router(ridings.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
