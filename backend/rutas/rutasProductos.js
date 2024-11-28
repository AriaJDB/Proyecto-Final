var rutas = require("express").Router();
var { mostrarProductos,
     nuevoProducto,
      borrarProducto,
       buscarPorId,
        modificarProducto,
    nombresProductos } = require("../bd/productosBD");

    rutas.get("/mostrar", async (req, res) => {
        try {
            const productos = await mostrarProductos();
    
            if (!req.query.search) {
                return res.status(200).json(productos);
            }
    
            const search = req.query.search.toLowerCase();
            const productosFiltrados = productos.filter(producto => 
                producto.nombre.toLowerCase().includes(search)
            );
    
            res.status(200).json(productosFiltrados);
        } catch (error) {
            console.error("Error al mostrar productos:", error);
            res.status(500).json({ error: "Error al obtener los productos" });
        }
    });
    

rutas.get("/nombres", async (req, res) => {
    const productos = await nombresProductos();
    res.json(productos);
});

rutas.get("/buscar/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrar/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

rutas.post("/nuevo", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

rutas.put("/modificar/:id", async (req, res) => {
    const productoModificado = await modificarProducto(req.params.id, req.body);
    res.json(productoModificado);
});

rutas.get("/mostrar/:id", async (req, res) => {
    try {
        const producto = await buscarPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al buscar producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});


module.exports = rutas;
