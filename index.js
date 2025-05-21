import http from 'http'
import url from 'url'
import {readFile} from 'fs'

// Cambiar esta función por la lectura del archivo de frutas con fs
function leerFrutas() { 
  const frutasData = [
    { id: 1, nombre: 'manzana', color: 'rojo' },
    { id: 2, nombre: 'banana', color: 'amarillo' },
    { id: 3, nombre: 'naranja', color: 'naranja' },
    { id: 4, nombre: 'uva', color: 'morado' },
    { id: 5, nombre: 'fresa', color: 'rojo' },
    { id: 6, nombre: 'manzana verde', color: 'verde' }
  ];
  console.log("Simulando lectura de frutas...");
  return frutasData;
}

// Crear el servidor HTTP
const servidor = http.createServer((req, res) => {
  // Configurar el header de respuesta como JSON
  res.setHeader('Content-Type', 'application/json');
  
  // Obtener la ruta de la URL
  const path = url.parse(req.url).pathname;

  // TODO: Implementar el manejo de las siguientes rutas:n
  if(req.method === 'GET'){
    // 1. '/' - Mensaje de bienvenida
    if(req.url === '/'){
      res.writeHead(200,{'Content-Type': 'application/json'})
      res.end(JSON.stringify({ "mensaje": "¡Bienvenido a la API de Frutas!" }))
    }
    
    else if (req.url === '/frutas/all'){
    // 2. '/frutas/all' - Devolver todas las frutas
      readFile('.\\frutas.json', (err,data) =>{
        if(err){
          res.writeHead(404,{'Content-Type':'text/plain'})
          res.end("Error Busqueda")
        }
        else{
          res.writeHead(200,{'Content-Type':'text/json'})
          res.end(data)
        }
      })
    }

    else if(req.url.startsWith('/frutas/id')){
      // 3. '/frutas/id/123' - Devolver una fruta por su ID
      const partes = req.url.split('/')
      const id = partes[3] // Obtengo la ID de la url

      if( isNaN(id)){ // Devuelve true si no es numerico
        res.writeHead(400, {'Content-Type':'application/json'})
        res.end(JSON.stringify({ error: `Fruta con ID ${id} invalido` }))
      }
      
      readFile('.\\frutas.json', (err,data) => {
        const frutas = JSON.parse(data) // Extraigo el JSON
        const fruta = frutas.find(e => e.id == Number(id) ) //
            
        if(!fruta){
          res.writeHead(404, {'Content-Type':'application/json'})
          res.end(JSON.stringify({ error: `Fruta con ID ${id} no encontrada` }))
        }else {
          res.writeHead(200, {'Content-Type': 'application/json' })
          res.end(JSON.stringify(fruta))          
        }
      })
    }

    else{
      // Por ahora, devolvemos un 404 para todas las rutas
      res.statusCode = 404;
      console.log(req.url)
      res.end(JSON.stringify({ error: 'Ruta no encontrada' })); 
    }
  }
  
  // 4. '/frutas/nombre/manzana' - Buscar frutas por nombre (parcial)
  // 5. '/frutas/existe/manzana' - Verificar si existe una fruta
  // 6. Cualquier otra ruta - Error 404
  
  
  
});

// Iniciar el servidor
const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}/`);
  console.log(`Rutas disponibles:`);
  console.log(`- http://localhost:${PUERTO}/`);
  console.log(`- http://localhost:${PUERTO}/frutas/all`);
  console.log(`- http://localhost:${PUERTO}/frutas/id/:id`);
  console.log(`- http://localhost:${PUERTO}/frutas/nombre/:nombre`);
  console.log(`- http://localhost:${PUERTO}/frutas/existe/:nombre`);
});