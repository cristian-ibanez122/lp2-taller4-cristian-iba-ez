
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine, SessionLocal
from app import models
from app.seed import cargar_datos_iniciales
from app.routers import plataformas, videojuegos


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        cargar_datos_iniciales(db)
    finally:
        db.close()

    yield


app = FastAPI(
    title="GameFlow API",
    description="API para consultar un catálogo de videojuegos",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(plataformas.router)
app.include_router(videojuegos.router)


@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido a la API de GameFlow"}


