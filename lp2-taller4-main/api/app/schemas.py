
from pydantic import BaseModel, ConfigDict


class PlataformaBase(BaseModel):
    nombre: str
    fabricante: str


class PlataformaCrear(PlataformaBase):
    pass


class PlataformaRespuesta(PlataformaBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class VideojuegoBase(BaseModel):
    titulo: str
    descripcion: str | None = None
    anio_lanzamiento: int | None = None
    genero: str
    plataforma_id: int


class VideojuegoCrear(VideojuegoBase):
    pass


class VideojuegoRespuesta(VideojuegoBase):
    id: int
    plataforma: PlataformaRespuesta

    model_config = ConfigDict(from_attributes=True)
