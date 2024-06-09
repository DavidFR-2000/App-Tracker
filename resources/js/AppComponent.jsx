import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Router, route } from 'preact-router';
import { Details } from './components/Details';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Profile } from './components/Profile';

export function AppComponent() {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [usuarioActivo, setUsuarioActivo] = useState(null);

    useEffect(() => {
        const usuario = localStorage.getItem('usuarioActivo');
        if (usuario) {
            setUsuarioActivo(JSON.parse(usuario));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('usuarioActivo');
        setUsuarioActivo(null);
        route('/');
    };

    const handleLoginSuccess = (usuario) => {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        setUsuarioActivo(usuario);
        route(`/profile/${usuario.username}`);
    };

    const handleSearch = () => {
        if (gameName && tagLine) {
            route(`/details/${gameName}/${tagLine}`);
        } else {
            alert('Por favor, ingresa tanto el nombre de invocador como la etiqueta.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <header className="bg-gradient-to-r from-indigo-50 to-pink-100 flex flex-col items-center justify-start p-4">
                {/* Barra de navegación */}
                <nav className="w-full bg-black shadow-md rounded-lg mb-8 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/Captura.PNG" // Reemplaza con la URL de tu imagen o logo
                            alt="App Logo"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => route('/')}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-500"
                        >
                            Home
                        </button>
                        {usuarioActivo ? (
                            <>
                                {usuarioActivo.invocadorFoto && (
                                    <img
                                        src={usuarioActivo.invocadorFoto} // Foto del invocador
                                        alt="Invocador"
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <button
                                    onClick={() => route(`/profile/${usuarioActivo.username}`)}
                                    className="text-white underline"
                                >
                                    {usuarioActivo.username}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all focus:outline-none focus:ring-4 focus:ring-red-500"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => route('/login')}
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all focus:outline-none focus:ring-4 focus:ring-red-500"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => route('/register')}
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500"
                                >
                                    Registro
                                </button>
                            </>
                        )}
                    </div>
                </nav>
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
                    {/* Rutas adicionales */}
                    <Register path="/register" onRegisterSuccess={handleLoginSuccess} />
                    <Login path="/login" onLoginSuccess={handleLoginSuccess} />
                    <Profile path="/profile/:user" />
                    <Details path="/details/:gameName/:tagLine" />
                </Router>
            </header>
            <footer className="bg-black text-white py-8">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <img
                            src="/Captura.PNG" // Reemplaza con la URL de tu imagen o logo
                            alt="App Logo"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                        <a href="/accesibilidad" className="hover:underline">Accesibilidad</a>
                        <a href="/aviso-legal" className="hover:underline">Aviso Legal</a>
                        <a href="/politica-cookies" className="hover:underline">Política de Cookies</a>
                        <a href="/politica-privacidad" className="hover:underline">Política de Privacidad</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
