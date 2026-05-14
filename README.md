# AlejandraSanchez_TrabajoFinalMarcas
Trabajo Final para la Asignatura de Marcas - Creación de una API con NODE
**Descripción del Proyecto**
Este proyecto consiste en una API REST desarrollada con Node.js y Express.js para gestionar una colección de fotografías y sus comentarios asociados.
La temática que he elegido ha sido una galería de fotos personales, donde cada foto contiene información como título, categoría, ubicación, fecha, autor, cámara, rating y si está marcada como favorita o no.
Además cada foto puede tener comentarios asociados realizados por distintos usuarios.
El objetivo del trabajo es aplicar los conceptios aprendidos en clase sobre:
- creación de APIs REST,
- uso de métodos HTTP,
- rutas con parámetros,
- query params,
- validaciones,
- filtros,
- estadísticas,
- y manejo de errores.
**Tecnologías utilizadas**
- Node.js
- Express
- JavaScript
- Bruno (para pruebas de endpoints) 
**Cómo ejecutar el proyecto**
1. Primero he ejecutado el servidor y he elegido el puerto no reservado 2026 http://localhost:2026
2. Despues he creado la estructura general con los datos de mis recursos principales (Fotos) y secundarios (comentarios de las fotos).
3. A continuación he programado los siguentes Endpoints:
- Obtener todos los resultados de mis recursos principales y secundarios con el localhost:2026/ .
- Obtener todas las fotos /fotos (GET) Devuelve todas las fotos de mi API
- Obtener una foto por ID /fotos/1 (GET route param) Esto devuelve una foto concreta.
- Obtener una foto por ID usando query param /buscar-foto?id=1 (GET) Es otra forma de obtener una foto pero usando query params.
- Crear una foto nueva /fotos (POST) Esto crea una nueva foto validando todos los campos obligatorios.
- Modificar una foto /fotos/1 (PUT) Esto actualiza una foto existente con los nuevos datos que queramos cambiar.
- Eliminar una foto /fotos/1 (DELETE) Esto elimina una foto por ID.
- Obtener todos los comentarios /comentarios (GET) Esto devuelve todos los comentarios.
- Obtener los comentarios de una foto concreta /fotos/1/comentarios (GET) Esto devuelve los comentarios de la foto que tiene ese ID.
- Crear comentario /comentarios (POST) Esta función añade un nuevo comentario a una foto existente.
- Eliminar comentario /comentarios/1 (DELETE) Esta función elimina un comentario por .
4. También he programado las siguientes funciones para realizar filtros y búsquedas:
- Buscar por texto /fotos/filtro/texto?q=surf (GET) Esto busca por coincidencia en título o autor.
- Filtrar por rating /fotos/filtro/rating?min=3&maz=5 (GET) Esto te permite filtar por un rango numerico , en este caso la valoración de la foto o rating.
- Filtrar favoritas /fotos/filtro/favoritas (GET) Aquí podemos filtrar mediante una condición boleana y va a devolver sólo las fotos favoritas.
- Ordenar fotos /fotos/orden/fecha?direccion=desc (GET) Con esta función podemos ordenar las fotos de forma ascendente o descendente los campos: título, rating,fecha,autor.
- Estadísticas de rating /fotos/stats/rating (GET) Aquí podemos calcular la media, el máximo y el mínimo de un campo numérico como es el rating.
- Total de registros /stats/totales (GET) Con esta función podemos calcular el total de fotos y el total de comentarios que tiene mi API.
- Conteo por categoría /fotos/stats/categorias (GET) Esto cuenta cuántas fotos hay por categoría.
- Error global (prueba) /error (GET) Este es un Endpoint de prueba para comprobar el manejo blogal de errores.
5. Además el código maneja sutuaciones de error con los siguientes códigos HTTP utilizados:
- 200 Operación correcta
- 201 Recurso creado correctamente 
- 400 Datos incorrectos
- 404 Recurso no encontrado
- 500 Error interno del servidor
**Pruebas con Bruno**
Todos los Endpoints han sido probados con Bruno.
En el repositorio se incluye la colección exportada de Bruno con una petición preparada para cada endpoint, lista para ejecutar.

**Trabajo realizado por : Alejandra Sánchez Franco**

**Asignatura: Lenguaje de Marcas**

**1º DAM**


