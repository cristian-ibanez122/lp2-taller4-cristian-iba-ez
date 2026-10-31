
from sqlalchemy.orm import Session

from app.models import Plataforma, Videojuego


def cargar_datos_iniciales(db: Session):
    if db.query(Plataforma).first() is not None:
        return

    plataformas = [
        Plataforma(nombre="PlayStation 5", fabricante="Sony"),
        Plataforma(nombre="Xbox Series X", fabricante="Microsoft"),
        Plataforma(nombre="Nintendo Switch", fabricante="Nintendo"),
    ]

    db.add_all(plataformas)
    db.commit()

    videojuegos = [
        Videojuego(
            titulo="God of War Ragnarök",
            descripcion="Aventura de acción basada en la mitología nórdica.",
            anio_lanzamiento=2022,
            genero="Acción",
            plataforma_id=1,
        ),
        Videojuego(
            titulo="Halo Infinite",
            descripcion="Aventura de ciencia ficción del universo Halo.",
            anio_lanzamiento=2021,
            genero="Acción",
            plataforma_id=2,
        ),
        Videojuego(
            titulo="Mario Kart 8 Deluxe",
            descripcion="Juego de carreras protagonizado por personajes de Nintendo.",
            anio_lanzamiento=2017,
            genero="Carreras",
            plataforma_id=3,
        ),
    ]

    db.add_all(videojuegos)
    db.commit()
