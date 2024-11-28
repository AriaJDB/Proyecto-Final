import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchInput({ label, apiUrl, id, selectedId, setSelectedId }) {
    const [options, setOptions] = useState([]); // Opciones de búsqueda
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Realizar la búsqueda siempre que cambie `searchTerm`
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}?search=${searchTerm}`);
                setOptions(response.data); // Asumiendo que la respuesta es un array
            } catch (error) {
                console.error("Error al cargar las opciones de búsqueda:", error);
            }
            setLoading(false);
        };

        fetchOptions();
    }, [searchTerm, apiUrl]);

    const handleChange = (e) => {
        const selectedOption = e.target.value;
        setSearchTerm(e.target.value); // Actualiza el término de búsqueda
        setSelectedId(selectedOption); // Actualiza el estado con el id seleccionado
    };

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                placeholder={`Buscar ${label}...`}
                value={searchTerm}
                onChange={handleChange}
            />
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <select
                    id={id}
                    className="form-control mt-2"
                    value={selectedId || ''}
                    onChange={(e) => setSelectedId(e.target.value)}
                >
                    <option value="">Seleccione un {label}</option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nombre || option.id} {/* Mostrar nombre o id */}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
