from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.audit import router as audit_router

app = FastAPI(
    title="GitHub Portfolio Auditor"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit_router)


@app.get("/")
async def root():
    return {
        "message": "GitHub Portfolio Auditor API"
    }