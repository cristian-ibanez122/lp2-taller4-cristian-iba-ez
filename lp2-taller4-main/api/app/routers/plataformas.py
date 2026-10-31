
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import obtener_db
from app.models import Plataforma
from app.schemas import PlataformaCrear, PlataformaRespuesta

router = APIRouter(
    prefix="/plataformas",
    tags=["Plataformas"]
)


@router.get("/", response_model=list[PlataformaRespuesta])
def listar_plataformas(db: Session = Depends(obtener_db)):
    return db.query(Plataforma).order_by(Plataforma.id).all()


@router.get("/{plataforma_id}", response_model=PlataformaRespuesta)
def obtener_plataforma(
    plataforma_id: int,
    db: Session = Depends(obtener_db)
):
    plataforma = db.query(Plataforma).filter(
        Plataforma.id == plataforma_id
    ).first()

    if plataforma is None:
        raise HTTPException(
            status_code=404,
            detail="Plataforma no encontrada"
        )

    return plataforma


@router.post("/", response_model=PlataformaRespuesta, status_code=201)
def crear_plataforma(
    datos: PlataformaCrear,
    db: Session = Depends(obtener_db)
):
    plataforma = Plataforma(**datos.model_dump())
    db.add(plataforma)
    db.commit()
    db.refresh(plataforma)
    return plataforma
