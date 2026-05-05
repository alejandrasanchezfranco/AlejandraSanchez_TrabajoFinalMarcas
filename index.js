const express = require('express');
const app = express();
const port = 2026;
app.use(express.json());

let fotos = [
    {
        id:1,
        titulo: "Surf en Cádiz",
        categoria: "surf",
        ubicacion: "Cádiz",
        fecha: "2026-02-17",
        autor:"Mi padre",
        camara: "Canon",
        rating: 4.5,
        favorita: true
    },
    {
        id:2,
        titulo: "Flamenco en Cádiz",
        categoria: "flamenco",
        ubicacion: "Cádiz",
        fecha: "2025-11-16",
        autor: "Mi padre",
        camara: "Canon",
        rating: 4.5,
        favorita:false
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

app.get('/fotos',(req,res)=>{
    res.json(fotos);
});

// Obtener una foto por id
app.get('/fotos/:id',(req,res)=>{
    const foto = fotos.find(f => f.id == req.params.id);

    if(!foto){
        return res.status(404).json({error:"Foto no encontrada"});
    }
    res.json(foto);
});

//Otra forma de obtener una foto ( query param)
app.get('/foto',(req,res)=>{
    const { id } = req.query;

    const foto = fotos.find(f=> f.id == id);

    if (!foto){
        return res.status(404).json({error: "Foto no encontrada"});
    }
    res.json(foto);
});

//Crear foto (POST)

app.post('/fotos',(req,res)=>{
    const nueva = req.body;

    if(!nueva.titulo || !nueva.categoria){
        return res.status(400).json({ error: "Faltan campos obligatorios"});
    }
    nueva.id = fotos.length + 1;

    fotos.push(nueva);

    res.status(201).json(nueva);
});

//Modificar la foto (PUT)

app.put('/fotos/:id',(req,res)=>{
    const index = fotos.findIndex(f=> f.id == req.params.id);

    if (index === -1){
        return res.status(404).json ({error: "Foto no encontrada"});
    }
    if(!req.body|| Object.keys(req.body).lenght === 0){
        return res.status(400).json({error: "Nose enviaron datos"});
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

//Obtener todos los registros secundarios

app.get('/comentarios',(req,res)=>{
    res.json(comentarios);
});

//Obtener registros secundarios que pertenecen a un principal concreto

app.get('/fotos/:id/comentarios',(req,res)=>{
    const fotoId = req.params.id;
    const comentariosFoto = comentarios.filter(c => c.foto_id == fotoId);
    res.json(comentariosFoto);
})

//Crear un nuevo r.secundario







