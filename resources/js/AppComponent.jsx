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
        <div className="min-h-screen flex flex-col justify-between bg-fondoWeb text-texto">
        <header className="bg-secciones w-full shadow-md p-4 max-h-20 flex justify-between items-center overflow-hidden">
            {/* Logo y Título */}
            <div className="flex items-center ml-10">
                <img
                    src="/Captura.PNG" // Reemplaza con la URL de tu imagen o logo
                    alt="App Logo"
                    className="min-w-[100px] max-h-[80px] w-auto object-contain" // Asegura que el logo se ajuste sin cortar
                />
            </div>
            {/* Menú de Navegación */}
            <div className="flex items-center space-x-4 mr-10">
                <button
                    onClick={() => route('/')}
                    className="font-titulo text-sm md:text-xl lg:text-2xl hover:text-enfasis1 transition-all focus:outline-none"
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
                            className="font-titulo text-sm md:text-xl lg:text-2xl hover:text-enfasis1 transition-all focus:outline-none"
                        >
                            {usuarioActivo.username}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="font-titulo text-sm md:text-xl lg:text-2xl hover:text-enfasis1 transition-all focus:outline-none"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => route('/login')}
                            className="font-titulo text-sm md:text-xl lg:text-2xl hover:text-enfasis1 transition-all focus:outline-none"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => route('/register')}
                            className="font-titulo text-sm md:text-xl lg:text-2xl hover:text-enfasis1 transition-all focus:outline-none"
                        >
                            Registro
                        </button>
                    </>
                )}
            </div>
        </header>
        <main className="flex flex-col items-center justify-start mt-24 p-4">
            <Router>
                {/* Ruta para la búsqueda, renderiza el formulario de búsqueda directamente */}
                <div path="/" className="w-full flex flex-col items-center">
                    <div className="w-full max-w-[1000px] -ml-12">
                        <h1 className="font-titulo italic font-bold text-center text-enfasis1 mb-8" style={{ fontSize: '80px', paddingTop: '50px', paddingBottom: '20px' }}>
                            Izanami.gg
                        </h1>
                        <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-4 md:space-y-0 mb-7">
                            <input
                                type="text"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                placeholder="Nombre de Invocador"
                                className="flex-grow bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                            />
                            <div className="flex items-center space-x-2">
                                <label className="text-texto text-2xl">#</label>
                                <input
                                    type="text"
                                    value={tagLine}
                                    onChange={(e) => setTagLine(e.target.value)}
                                    placeholder="Etiqueta"
                                    className="flex-grow bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-enfasis1 text-white py-4 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2 md:ml-4" // Agregado un margen a la izquierda en dispositivos grandes
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                {/* Rutas adicionales */}
                <Register path="/register" onRegisterSuccess={handleLoginSuccess} />
                <Login path="/login" onLoginSuccess={handleLoginSuccess} />
                <Profile path="/profile/:user" />
                <Details path="/details/:gameName/:tagLine" />
            </Router>
        </main>
        <footer className="bg-secciones text-texto py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <img
                        src="/Captura.PNG" // Reemplaza con la URL de tu imagen o logo
                        alt="App Logo"
                        className="min-w-[100px] max-h-[200px] w-auto object-contain" // Ajusta el tamaño del logo
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-titulo text-lg">
                    <a href="/accesibilidad" className="hover:text-enfasis1 transition-all">Accesibilidad</a>
                    <a href="/aviso-legal" className="hover:text-enfasis1 transition-all">Aviso Legal</a>
                    <a href="/politica-cookies" className="hover:text-enfasis1 transition-all">Política de Cookies</a>
                    <a href="/politica-privacidad" className="hover:text-enfasis1 transition-all">Política de Privacidad</a>
                </div>
            </div>
        </footer>
    </div>
);
}