var rutas = require("express").Router();

var { getSessionUsuario,
    getSessionAdmin,
    login,
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario,
    nombresUsuarios } = require("../bd/usuariosBD");

    rutas.get("/mostrar", async (req, res) => {
        try {
            const usuarios = await mostrarUsuarios();
    
            if (!req.query.search) {
                return res.status(200).json(usuarios);
            }
    
            const search = req.query.search.toLowerCase();
            const usuariosFiltrados = usuarios.filter(usuario => 
                usuario.nombre.toLowerCase().includes(search)
            );
    
            res.status(200).json(usuariosFiltrados);
        } catch (error) {
            console.error("Error al mostrar usuarios:", error);
            res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    });
    

rutas.get("/nombres",async(req,res)=>{
    const usuarios=await nombresUsuarios();
    res.json(usuarios);
});

rutas.get("/buscar/:id", async(req, res)=>{
    var usuarioValido= await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrar/:id",async(req,res)=>{
    var borrado=await borrarUsuario(req.params.id);
    res.json(borrado);
});

rutas.post("/nuevo",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

rutas.put("/modificar/:id", async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const resultado = await modificarUsuario(id, datosNuevos);
    res.json(resultado);
});

rutas.post("/login",async(req,res)=>{
    const usuarioCorrecto=await login(req,req.body.usuario,req.body.password);
    res.json(usuarioCorrecto);
});

rutas.get("/getSessionUsuario",(req,res)=>{
   // res.json(getSessionUsuario(req));
   var sesionValida=getSessionUsuario(req);
   console.log("getsession----");
   console.log(sesionValida);
   res.json(sesionValida);
   
   
});

rutas.get("/getSessionAdmin",(req,res)=>{
    res.json(getSessionUsuario(req));
});

module.exports=rutas; 