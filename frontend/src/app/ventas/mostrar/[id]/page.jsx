"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MostrarVenta({ params }) {
    const { id } = params; // Obtén el ID desde los parámetros de la ruta
    const [venta, setVenta] = useState(null); // Estado para almacenar los datos de la venta
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        let cancel = false; // Variable para evitar actualizaciones en caso de desmontar el componente

        // Solicitud a la API para obtener los datos de la venta
        const fetchVenta = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/mostrar/${id}`);
                if (!cancel) {
                    setVenta(response.data);
                }
            } catch (error) {
                if (!cancel) {
                    setError(error.message);
                }
            }
        };

        fetchVenta();

        // Cleanup para evitar actualizaciones de estado después de desmontar
        return () => {
            cancel = true;
        };
    }, [id]); // Se asegura de que solo se ejecute si cambia el `id`

    if (error) {
        return <div>Error al cargar la venta: {error}</div>; // Manejo básico de errores
    }

    if (!venta) {
        return <div>Cargando venta...</div>; // Muestra un mensaje mientras los datos están cargando
    }

    return (
        <div className="container mt-5">
            <h1>Detalles de la Venta</h1>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID de la Venta</td>
                        <td>{venta.id}</td>
                    </tr>
                    <tr>
                        <td>Cantidad</td>
                        <td>{venta.cantidad}</td>
                    </tr>
                    <tr>
                        <td>Fecha y Hora</td>
                        <td>{new Date(venta.fechaHora).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>ID del Producto</td>
                        <td>{venta.idProd1}</td>
                    </tr>
                    <tr>
                        <td>ID del Usuario</td>
                        <td>{venta.idUsu1}</td>
                    </tr>
                    <tr>
                        <td>Estatus</td>
                        <td>{venta.estatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
