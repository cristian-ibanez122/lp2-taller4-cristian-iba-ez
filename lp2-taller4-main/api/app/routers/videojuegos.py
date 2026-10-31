
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import obtener_db
from app.models import Plataforma, Videojuego
from app.schemas import VideojuegoCrear, VideojuegoRespuesta

router = APIRouter(
    prefix="/videojuegos",
    tags=["Videojuegos"]
)


@router.get("/", response_model=list[VideojuegoRespuesta])
def listar_videojuegos(
    plataforma_id: int | None = Query(default=None),
    db: Session = Depends(obtener_db)
):
    consulta = db.query(Videojuego)

    if plataforma_id is not None:
        consulta = consulta.filter(
            Videojuego.plataforma_id == plataforma_id
        )

    return consulta.order_by(Videojuego.id).all()


@router.get("/{videojuego_id}", response_model=VideojuegoRespuesta)
def obtener_videojuego(
    videojuego_id: int,
    db: Session = Depends(obtener_db)
):
    videojuego = db.query(Videojuego).filter(
        Videojuego.id == videojuego_id
    ).first()

    if videojuego is None:
        raise HTTPException(
            status_code=404,
            detail="Videojuego no encontrado"
        )

    return videojuego


@router.post("/", response_model=VideojuegoRespuesta, status_code=201)
def crear_videojuego(
    datos: VideojuegoCrear,
    db: Session = Depends(obtener_db)
):
    plataforma = db.query(Plataforma).filter(
        Plataforma.id == datos.plataforma_id
    ).first()

    if plataforma is None:
        raise HTTPException(
            status_code=400,
            detail="La plataforma indicada no existe"
        )

    videojuego = Videojuego(**datos.model_dump())
    db.add(videojuego)
    db.commit()
    db.refresh(videojuego)
    return videojuego
