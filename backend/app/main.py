from fastapi import FastAPI
from app.api import ridings
from app.api import swing_ridings

app = FastAPI()

app.include_router(ridings.router)
app.include_router(swing_ridings.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
