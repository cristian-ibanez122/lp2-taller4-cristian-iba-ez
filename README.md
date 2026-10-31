# Lenguaje de Programación 2 - Taller 4

![commits](https://badgen.net/github/commits/clubdecomputacion/lp2-taller4?icon=github) 
![last_commit](https://img.shields.io/github/last-commit/clubdecomputacion/lp2-taller4)

- ver [badgen](https://badgen.net/) o [shields](https://shields.io/) para otros tipos de _badges_

## Autor

- [@cristian ibañez](https://www.github.com/estudiante)

## Descripción del Proyecto
GameFlow es una aplicación web que permite consultar un catálogo de videojuegos organizados por plataforma. El sistema muestra información de los juegos y permite explorar sus detalles desde una interfaz web.

El proyecto se desarrolló aplicando una arquitectura de cuatro contenedores con Docker Compose, separando la interfaz de usuario, la API, la base de datos y el servidor proxy inverso.

2. Objetivo
Construir una aplicación web utilizando tecnologías modernas y contenedores Docker, conectando un frontend con una API REST y una base de datos PostgreSQL. Además, implementar Nginx como punto único de acceso al sistema.

3. Tecnologías utilizadas
Python: lenguaje utilizado para desarrollar la API.
FastAPI: framework para crear la API REST.
SQLAlchemy: herramienta para trabajar con la base de datos desde Python.
PostgreSQL 15: sistema gestor de base de datos.
React / Next.js: tecnologías utilizadas por el frontend del proyecto.
Nginx: servidor web y proxy inverso.
Docker: permite ejecutar los componentes en contenedores independientes.
Docker Compose: permite configurar y ejecutar los servicios del proyecto.
TypeScript: utilizado en partes del frontend.
4. Modelo de datos
El sistema utiliza dos entidades principales: Videojuego y Plataforma.

Videojuego
Representa cada juego registrado en el catálogo.

Sus atributos principales son:

id: identificador único del videojuego.
titulo: nombre del videojuego.
descripcion: información general del juego.
anio_lanzamiento: año de lanzamiento.
genero: género del videojuego.
plataforma_id: identificador de la plataforma relacionada.
Plataforma
Representa la plataforma en la que se encuentra un videojuego.

Sus atributos principales son:

id: identificador único de la plataforma.
nombre: nombre de la plataforma.
Relación entre las entidades
La relación es de uno a muchos (1:N). Una plataforma puede tener varios videojuegos, mientras que cada videojuego está asociado a una plataforma.

La relación se establece mediante la clave foránea plataforma_id de la entidad Videojuego.

5. Arquitectura de cuatro contenedores
El proyecto está dividido en los siguientes servicios:

Contenedor	Tecnología	Responsabilidad
database	PostgreSQL 15	Almacenar los videojuegos y las plataformas.
api	FastAPI y SQLAlchemy	Procesar las solicitudes y consultar la base de datos.
frontend	React / Next.js	Mostrar la interfaz y permitir la interacción con el catálogo.
reverse-proxy	Nginx	Recibir las solicitudes y dirigirlas al frontend o a la API.
Nginx funciona como punto de entrada de la aplicación. Las solicitudes de la interfaz se dirigen al frontend y las solicitudes que comienzan con /api/ se encaminan hacia la API.

La base de datos y la API se comunican a través de la red interna de Docker Compose.

6. Funcionalidades
Consultar el catálogo de videojuegos.
Visualizar información detallada de los videojuegos.
Organizar los videojuegos por plataforma.
Consultar los datos mediante una API REST.
Almacenar la información en PostgreSQL.
Mostrar portadas de videojuegos mediante archivos de imagen locales.
Ejecutar los servicios de forma independiente con Docker Compose.
Acceder a la aplicación a través del proxy inverso Nginx.
Manejar identificadores de videojuegos inexistentes mediante una respuesta de error.
7. Endpoints principales de la API
La API permite consultar los videojuegos y las plataformas.

Método HTTP	Endpoint	Descripción
GET	/api/videojuegos/	Lista los videojuegos.
GET	/api/videojuegos/{id}	Consulta un videojuego por su identificador.
GET	/api/videojuegos/?plataforma_id={id}	Filtra los videojuegos por plataforma, si está habilitado ese parámetro en la API.
GET	/api/plataformas/	Lista las plataformas disponibles.
Las rutas anteriores se consultan a través del proxy inverso. La documentación interactiva de FastAPI también permite probar los endpoints si está disponible mediante la configuración del proxy.

8. Requisitos para ejecutar el proyecto
Antes de iniciar GameFlow, se necesita:

Docker instalado y funcionando.
Docker Compose disponible.
El repositorio del proyecto descargado en el equipo.
El archivo .env configurado con las variables requeridas para la base de datos.
9. Instalación y ejecución
Paso 1. Abrir la carpeta del proyecto
Desde una terminal de Ubuntu:

cd ~/lp2-taller4
Paso 2. Construir e iniciar los contenedores
Ejecutar:

docker compose up -d --build
Este comando construye las imágenes necesarias e inicia los servicios en segundo plano.

Paso 3. Comprobar el estado de los servicios
Ejecutar:

docker compose ps
Verificar que los cuatro servicios estén ejecutándose correctamente.

Paso 4. Abrir la aplicación
En el navegador, ingresar a:

http://localhost:8080

La aplicación debe mostrar la interfaz de GameFlow.

Paso 5. Consultar la API
Para consultar los videojuegos, se puede utilizar:

http://localhost:8080/api/videojuegos/

Para consultar las plataformas:

http://localhost:8080/api/plataformas/

10. Comandos útiles
Consultar el estado de los contenedores:

docker compose ps
Consultar los registros de todos los servicios:

docker compose logs
Consultar los registros de la API:

docker compose logs api
Consultar los registros del proxy:

docker compose logs reverse-proxy
Reconstruir el frontend después de modificarlo:

docker compose up -d --build frontend
Detener los servicios sin eliminar el volumen de datos:

docker compose down
11. Seguridad y proxy inverso
Nginx funciona como único punto de entrada externo de la aplicación. Esto permite centralizar el enrutamiento de solicitudes y evitar que cada servicio necesite publicar su propio puerto.

La base de datos y la API se comunican mediante la red interna de Docker. En la configuración final, únicamente el servicio reverse-proxy debe publicar un puerto hacia el equipo anfitrión.

Las credenciales de la base de datos deben mantenerse en el archivo .env, que no debe subirse al repositorio. El archivo .env.example puede utilizarse como referencia sin incluir contraseñas reales.

12. Pruebas realizadas
Las siguientes pruebas permiten comprobar el funcionamiento del sistema:

 Los cuatro contenedores se inician correctamente.
 La página principal abre en http://localhost:8080.
 El catálogo consulta los datos reales de la API.
 Las imágenes de los videojuegos se muestran correctamente.
 La consulta de un videojuego existente devuelve sus datos.
 Un identificador inexistente produce una respuesta de error controlada.
 El listado de plataformas devuelve los datos correspondientes.
 Nginx dirige las solicitudes hacia el servicio correcto.
 Solo Nginx publica un puerto externo.
 Los datos persisten después de reiniciar los contenedores.
13. Conclusión
El desarrollo de GameFlow permitió aplicar los conocimientos de programación web, bases de datos relacionales, creación de API REST y contenedorización.

La separación de responsabilidades facilita el mantenimiento de la aplicación. PostgreSQL se encarga de la persistencia de los datos, FastAPI procesa las solicitudes, el frontend presenta la información y Nginx centraliza el acceso al sistema.

Este proyecto permite comprender cómo se integran diferentes tecnologías para construir una aplicación web organizada y ejecutable mediante Docker Compose.
