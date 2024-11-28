    var rutas = require("express").Router();
    var { 
        borrarVenta,
        mostrarVentas, 
        nuevaVenta, 
        buscarPorId, 
        cancelarVenta, 
        marcarComoVendida, 
        modificarVenta,
        mostrarVentaPorId } = require("../bd/ventasBD");


    rutas.get("/mostrar", async (req, res) => {
        const ventas = await mostrarVentas();
        res.json(ventas);
    });

    rutas.get("/mostrar/:id", async (req, res) => {
        const { id } = req.params; // Obtén el ID de los parámetros
        try {
            const venta = await mostrarVentaPorId(id); // Nueva función para buscar por ID
            if (!venta) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }
            res.json(venta);
        } catch (error) {
            console.error("Error al obtener la venta:", error);
            res.status(500).json({ error: "Error al obtener la venta" });
        }
    });    


    rutas.get("/buscar/:id", async (req, res) => {
        const venta = await buscarPorId(req.params.id);
        res.json(venta);
    });


    rutas.post("/nueva", async (req, res) => {
        const ventaValida = await nuevaVenta(req.body);  
        res.json({ ventaValida });
    });


    rutas.put("/cancelar/:id", async (req, res) => {
        const cancelada = await cancelarVenta(req.params.id);  
        res.json({ cancelada });
    });

    rutas.delete("/borrar/:id", async (req, res) => {
        var ventaCancelada = await borrarVenta(req.params.id);
        res.json(ventaCancelada);
    });


    rutas.put("/vendida/:id", async (req, res) => {
        const vendida = await marcarComoVendida(req.params.id);  
        res.json({ vendida });
    });


    rutas.put("/modificar/:id", async (req, res) => {
        const resultado = await modificarVenta(req.params.id, req.body);  
        res.json(resultado);
    });

    module.exports = rutas;
