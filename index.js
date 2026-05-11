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











