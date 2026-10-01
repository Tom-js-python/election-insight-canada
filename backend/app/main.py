from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import ridings
from app.api import swing_ridings
from app.api import parties

from app.config import CORS_ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=[],
)

app.include_router(ridings.router)
app.include_router(swing_ridings.router)
app.include_router(parties.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
