
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = (
    f"postgresql+psycopg://"
    f"{os.getenv('POSTGRES_USER', 'gameflow_user')}:"
    f"{os.getenv('POSTGRES_PASSWORD', 'cambia_esta_clave')}@"
    f"database:5432/"
    f"{os.getenv('POSTGRES_DB', 'gameflow_db')}"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def obtener_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
