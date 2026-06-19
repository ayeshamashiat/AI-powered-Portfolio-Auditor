from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import audit

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}   

app.include_router(audit.router)
