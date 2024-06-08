import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Router, route } from 'preact-router';
import { Details } from './components/Details';

export function AppComponent() {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');

    const handleSearch = () => {
        route(`/details/${gameName}/${tagLine}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Router>
                {/* Ruta para la búsqueda, renderiza el formulario de búsqueda directamente */}
                <div path="/">
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Buscar Invocador</h1>
                            <input
                                type="text"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                placeholder="Nombre de Invocador"
                                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                value={tagLine}
                                onChange={(e) => setTagLine(e.target.value)}
                                placeholder="Etiqueta"
                                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                {/* Ruta para mostrar los detalles */}
                <Details path="/details/:gameName/:tagLine" />
            </Router>
        </div>
    );
}
