
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Plataforma(Base):
    __tablename__ = "plataformas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)
    fabricante = Column(String(100), nullable=False)

    videojuegos = relationship(
        "Videojuego",
        back_populates="plataforma"
    )


class Videojuego(Base):
    __tablename__ = "videojuegos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text, nullable=True)
    anio_lanzamiento = Column(Integer, nullable=True)
    genero = Column(String(50), nullable=False)

    plataforma_id = Column(
        Integer,
        ForeignKey("plataformas.id"),
        nullable=False
    )

    plataforma = relationship(
        "Plataforma",
        back_populates="videojuegos"
    )
