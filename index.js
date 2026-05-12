const express = require('express');
const app = express();
const port = 2026;
app.use(express.json());

let fotos = [
    {
        "id":1,
        "titulo": "Surf en Cádiz",
        "categoria": "surf",
        "ubicacion": "Cádiz",
        "fecha": "2026-02-17",
        "autor":"Mi padre",
        "camara": "Canon",
        "rating": 4.5,
        "favorita": true
    },
    {
        "id":2,
        "titulo": "Flamenco en Cádiz",
        "categoria": "flamenco",
        "ubicacion": "Cádiz",
        "fecha": "2025-11-16",
        "autor": "Mi padre",
        "camara": "Canon",
        "rating": 4.5,
        "favorita":false
    }
];
let comentarios = [
    {
        id: 1,
        foto_id: 1,
        usuario: "Emilio",
        texto: "Brutal, la foto",
        fecha: "2026-02-18"

    },
    {
        id:2,
        foto_id: 2,
        usuario: "Paula",
        texto: "Me encanta!",
        fecha: "2025-11-18"
    }
];

app.listen(port, () => {
    console.log("Servidor abierto");
})

//====== Endpoints básicos ========

//Obtener todas las fotos
app.get('/fotos',(req,res)=>{
    res.json(fotos);
});

// Obtener una foto por id (route param)
app.get('/fotos/:id',(req,res)=>{
    const foto = fotos.find(f => f.id == req.params.id);

    if(!foto){
        return res.status(404).json({error:"Foto no encontrada"});
    }
    res.json(foto);
});

//Otra forma de obtener una foto ( query param)
app.get('/buscar-foto',(req,res)=>{
    const { id } = req.query;
    if(!id){
        return res.status(400).json({error:"Parámetro 'id' requerido"});
    }

    const foto = fotos.find(f=> f.id == id);

    if (!foto){
        return res.status(404).json({error: "Foto no encontrada"});
    }
    res.json(foto);
});

//Crear foto (POST)

app.post('/fotos',(req,res)=>{

   

    if(!req.body.titulo || !req.body.categoria|| !req.body.ubicacion || !req.body.fecha || !req.body.autor || !req.body.camara || !req.body.rating || !req.body.favorita){
        return res.status(400).json({ error: "Faltan campos obligatorios"});
    }
    
    let nuevaFoto = {
        id:fotos.length + 1,
        titulo: req.body.titulo,
        categoria: req.body.categoria,
        ubicacion: req.body.ubicacion,
        fecha: req.body.fecha,
        autor:req.body.autor,
        camara: req.body.camara,
        rating: req.body.rating,
        favorita: req.body.favorita
    }
    

    fotos.push(nuevaFoto);

    return res.status(201).json(nuevaFoto);
});

//Modificar la foto (PUT)

app.put('/fotos/:id',(req,res)=>{
    const index = fotos.findIndex(f=> f.id == req.params.id);

    if (index === -1){
        return res.status(404).json ({error: "Foto no encontrada"});
    }
    if(!req.body|| Object.keys(req.body).length === 0){
        return res.status(400).json({error: "No se enviaron datos"});
    }

    fotos[index] = {...fotos[index],...req.body};

    res.json(fotos[index]);
});

//Eliminar una foto

app.delete('/fotos/:id',(req,res)=>{
    const index = fotos.findIndex(f => f.id == req.params.id);

    if (index === -1){
        return res.status(404).json({error:"Foto no encontrada"});
    }
    fotos.splice(index,1);

    res.json({mensaje:"Foto eliminada"});
});

//======== Endpoints recursos secundarios =========

//Obtener todos los comentarios

app.get('/comentarios',(req,res)=>{
    res.json(comentarios);
});

//Obtener comentarios de una foto específica

app.get('/fotos/:id/comentarios',(req,res)=>{
    const fotoId = req.params.id;
    const comentariosFoto = comentarios.filter(c => c.foto_id == fotoId);

    if(comentariosFoto.length === 0){
        return res.status (404).json({error: "No hay comentarios para esta foto"});
    }
    res.json(comentariosFoto);
});

//Crear un nuevo comentario ( POST)

app.post('/comentarios',(req,res) =>{
    
    if(!req.body.foto_id|| !req.body.usuario || !req.body.texto || !req.body.fecha){
        return res.status (400).json({error:"Faltan campos obligatorios"});
    }

    const fotoExiste = fotos.find(f => f.id == req.body.foto_id);
    if(!fotoExiste){
        return res.status(404).json({error:"La foto no existe"});
    }

    const nuevoComentario = {
        id:comentarios.length +1,
        foto_id :req.body.foto_id,
        usuario :req.body.usuario,
        texto :req.body.texto,
        fecha :req.body.fecha
    };

    comentarios.push(nuevoComentario);
    res.status(201).json(nuevoComentario);
});

// Eliminar un comentario ( DELETE)

app.delete('/comentarios/:id',(req,res)=>{
    const index = comentarios.findIndex(c =>c.id == req.params.id );

    if(index === -1){
        return res.status(404).json({error: "Comentario no encontrado"});

    }

    comentarios.splice(index,1);
    res.json({mensaje:"Comentario eliminado correctamente"});
});

// ============ Búsquedas y Filtros =============

// Filtrar las fotos por texto (GET)

app.get('/fotos/filtro/texto',(req,res) =>{
    const {q} = req.query;
    if(!q){
        return res.status(400).json({error: "Parámetro 'q' requerido"});

    }
    const resultados = fotos.filter (f =>
        f.titulo.toLowerCase().includes(q.toLowerCase()) || 
        f.autor.toLocaleLowerCase().includes(q.toLowerCase())

    );
    res.json(resultados);
});

// Filtrar por rating ( mínimo y máximo)(GET)

app.get('/fotos/filtro/rating',(req,res)=>{
    const {min,max} = req.query;
    let resultados = fotos;

    if(min){
        resultados = resultados.filter(f=> f.rating >= parseFloat(min));

    }
    if(max){
        resultados = resultados.filter(f => f.rating <= parseFloat(max));
    }
    if(resultados.length === 0){
        return res.status(404).json({error: "No hay fotos en ese rango de rating"});
    }
    res.json(resultados);
});

// Filtrar por favoritas (booleano) (GET)

app.get('/fotos/filtro/favoritas',(req,res)=>{
    const resultados = fotos.filter(f => f.favorita === true);
    res.json(resultados);
});

// Ordenar fotos (GET)

app.get('/fotos/orden/:campo',(req,res)=>{
    const {campo} = req.params;
    const {direccion} = req.query; // 'asc' o 'desc'

    const camposValidos = ['titulo','rating','fecha','autor'];
    if(!camposValidos.includes(campo)){
        return res.status(400).json({ error: `Campo válido: ${camposValidos.join(', ')}` });
    }
    const copia = [...fotos];
    copia.sort((a,b)=>{
        if (a[campo]< b[campo]) return direccion === 'desc'? 1: -1;
        if (a[campo]< b[campo]) return direccion === 'desc'? -1: 1;
        return 0;
    });
    res.json(copia);
});

// =========== Estadísticas y Utilidades ==============

// Estadisticas de rating ( GET)

app.get('/fotos/stats/rating',(req,res)=>{
    if(fotos.length === 0){
        return res.status(400).json({error: "No hay fotos"});
    }
    const ratings = fotos.map(f=>f.rating);
    const media =(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(2);
    const maximo = Math.max(...ratings);
    const minimo = Math.min(...ratings);

    res.json({media,maximo,minimo});
});

// Obtener el total de registros (GET)

app.get('/stats/totales',(req,res)=>{
    res.json({
        totalFotos:fotos.length,
        totalComentarios: comentarios.length
    });
});

// Contar fotos por categoría (GET)

app.get('/fotos/stats/categorias',(req,res)=>{
    const conteo = {};
    fotos.forEach(f=>{
        conteo[f.categoria]=(conteo[f.categoria]|| 0)+ 1;
    });
    res.json(conteo);
});

// ============= Manejo de errores Global ===============

app.get('/error',(req,res,next)=>{
    next (new Error("Error de prueba"));
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({error:"Error interno del servidor"});
});






