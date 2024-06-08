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
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-pink-100 flex items-center justify-center p-4">
            <Router>
                {/* Ruta para la búsqueda, renderiza el formulario de búsqueda directamente */}
                <div path="/" className="w-full max-w-lg">
                    <div className="bg-white p-10 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl max-w-lg w-full">
                        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Buscar Invocador</h1>
                        <input
                            type="text"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                            placeholder="Nombre de Invocador"
                            className="w-full p-4 mb-5 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:border-gray-700 transition-all"
                        />
                        <input
                            type="text"
                            value={tagLine}
                            onChange={(e) => setTagLine(e.target.value)}
                            placeholder="Etiqueta"
                            className="w-full p-4 mb-7 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:border-gray-700 transition-all"
                        />
                        <button
                            onClick={handleSearch}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-blue-800 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                {/* Ruta para mostrar los detalles */}
                <Details path="/details/:gameName/:tagLine" />
            </Router>
        </div>
    );
}
