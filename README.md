# Práctica: Servidor HTTP Simple con Node.js

Este ejercicio te ayudará a aprender cómo crear un servidor web básico con Node.js sin usar frameworks, implementando un API REST simple para gestionar información sobre frutas.

## 🎯 Objetivo

Crear un servidor HTTP que responda a diferentes rutas (`pathname`) de la URL y devuelva información sobre frutas en formato JSON.

## ✨ Características Implementadas

- Servidor HTTP básico usando los módulos `http` y `url` de Node.js.
- Manejo de múltiples rutas (`/`, `/frutas/all`, `/frutas/id/:id`, `/frutas/nombre/:nombre`, `/frutas/existe/:nombre`).
- Devolución de respuestas en formato JSON.
- Manejo de errores (400 Bad Request, 404 Not Found).
- Búsqueda de frutas por nombre parcial e ignorando mayúsculas/minúsculas.
- Verificación de existencia de fruta por nombre exacto e ignorando mayúsculas/minúsculas.
- Un script de pruebas automatizadas para verificar el correcto funcionamiento de las rutas y casos de borde.

## 📋 Rutas implementadas

1.  `GET /` → Mensaje de bienvenida.
2.  `GET /frutas/all` → Lista completa de todas las frutas.
3.  `GET /frutas/id/:id` → Buscar una fruta específica por su ID.
    - Responde con la fruta (200 OK) si se encuentra.
    - Responde con un error 404 Not Found si el ID no existe.
    - Responde con un error 400 Bad Request si el ID no es un número válido.
4.  `GET /frutas/nombre/:nombre` → Buscar frutas que contengan el texto proporcionado en su nombre (búsqueda parcial, insensible a mayúsculas/minúsculas).
    - Responde con un array de frutas (200 OK). El array puede estar vacío si no hay coincidencias.
5.  `GET /frutas/existe/:nombre` → Verificar si existe **exactamente** una fruta con el nombre proporcionado (insensible a mayúsculas/minúsculas).
    - Responde con un objeto JSON `{ nombre: '...', existe: true/false }` (200 OK).
6.  Cualquier otra ruta → Error 404 Not Found.

## 🚀 Cómo empezar

1.  Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2.  Clona o descarga el código.
3.  Guarda el código del servidor en un archivo (por ejemplo, `index.js`).
4.  Guarda el código de los tests en otro archivo (por ejemplo, `test.js`).
5.  Inicia el servidor desde tu terminal:
    ```bash
    node index.js
    ```
6.  Abre otra terminal y ejecuta los tests (asegúrate de que el servidor esté corriendo):
    ```bash
    node test.js
    ```
7.  También puedes usar herramientas como `curl` o la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) en VS Code (usando el archivo `api.http` proporcionado) para probar las rutas manualmente.

## 💡 Notas sobre la implementación

- La lista de frutas está actualmente definida directamente en el código (`frutasData`) para simplificar. En una aplicación real, estos datos provendrían típicamente de una base de datos o un archivo externo.
- El parseo de rutas se realiza dividiendo el `pathname` de la URL en segmentos.
- La búsqueda por nombre utiliza `String.prototype.includes()` y conversión a minúsculas (`toLowerCase()`) para la búsqueda parcial e insensible a mayúsculas/minúsculas.
- La verificación de existencia utiliza `Array.prototype.some()` y conversión a minúsculas para la búsqueda exacta e insensible a mayúsculas/minúsculas.

## ✅ Ejemplo de respuestas

Aquí tienes ejemplos del formato de respuesta que la API debería devolver:

```javascript
// GET http://localhost:3000/ ✔
{ "mensaje": "¡Bienvenido a la API de Frutas!" }

// GET http://localhost:3000/frutas/all ✔
[
  { "id": 1, "nombre": "manzana", "color": "rojo" },
  { "id": 2, "nombre": "banana", "color": "amarillo" },
  { "id": 3, "nombre": "naranja", "color": "naranja" },
  { "id": 4, "nombre": "uva", "color": "morado" },
  { "id": 5, "nombre": "fresa", "color": "rojo" },
  { "id": 6, "nombre": "manzana verde", "color": "verde" }
]

// GET http://localhost:3000/frutas/id/1 ✔
{ "id": 1, "nombre": "manzana", "color": "rojo" }

// GET http://localhost:3000/frutas/id/999 ✔
{ "error": "Fruta con ID 999 no encontrada" }

// GET http://localhost:3000/frutas/nombre/manz
[
  { "id": 1, "nombre": "manzana", "color": "rojo" },
  { "id": 6, "nombre": "manzana verde", "color": "verde" }
]

// GET http://localhost:3000/frutas/nombre/platano
[] // Array vacío si no hay coincidencias

// GET http://localhost:3000/frutas/existe/manzana
{ "nombre": "manzana", "existe": true }

// GET http://localhost:3000/frutas/existe/KiWi
{ "nombre": "kiwi", "existe": false }

// GET http://localhost:3000/ruta/invalida
{ "error": "Ruta no encontrada" }
```
