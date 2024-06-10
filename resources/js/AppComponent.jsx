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
        <div className="flex flex-col min-h-screen w-full bg-radial-gradient from-enfasis2 via-fondoWeb to-enfasis1 animate-gradient-x text-texto font-parrafo bg-[length:200%_200%] m-0 p-0">
            <header className="flex items-center justify-between bg-transparent z-50 w-full px-4 md:px-8">
                <div className="flex items-center space-x-4">
                    <img
                        src="/Captura.PNG"
                        alt="App Logo"
                        className="h-12 w-auto object-contain"
                    />
                    <span className="text-xl font-titulo">Izanami.gg</span>
                </div>
                <nav className="flex space-x-4 text-base md:text-lg font-titulo">
                    <button
                        onClick={() => route('/')}
                        className="hover:text-enfasis1 transition duration-300"
                    >
                        Home
                    </button>
                    {usuarioActivo ? (
                        <>
                            {usuarioActivo.invocadorFoto && (
                                <img
                                    src={usuarioActivo.invocadorFoto}
                                    alt="Invocador"
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                            <button
                                onClick={() => route(`/profile/${usuarioActivo.username}`)}
                                className="hover:text-enfasis1 transition duration-300"
                            >
                                {usuarioActivo.username}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="hover:text-enfasis1 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => route('/login')}
                                className="hover:text-enfasis1 transition duration-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => route('/register')}
                                className="hover:text-enfasis1 transition duration-300"
                            >
                                Registro
                            </button>
                        </>
                    )}
                </nav>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center w-full m-0 p-0">
                <Router>
                    <div path="/" className="flex flex-col items-center w-full md:w-5/6 lg:w-11/12 space-y-4">
                        <h1 className="text-6xl md:text-8xl font-titulo mb-8">Izanami.gg</h1>
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
                                className="bg-enfasis1 text-white py-4 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2 md:ml-4"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    <Register path="/register" onRegisterSuccess={handleLoginSuccess} />
                    <Login path="/login" onLoginSuccess={handleLoginSuccess} />
                    <Profile path="/profile/:user" />
                    <Details path="/details/:gameName/:tagLine" />
                </Router>
            </main>
            <footer className="bg-secciones p-4 flex flex-col items-center space-y-6 w-full rounded-t-lg z-50 mt-auto">
                <div className="flex items-center space-x-4">
                    <img
                        src="/Captura.PNG"
                        alt="App Logo"
                        className="h-24 w-auto object-contain"
                    />
                </div>
                <div className="flex space-x-6 text-base">
                    <a href="/accesibilidad" className="hover:text-enfasis1 transition duration-300">Accesibilidad</a>
                    <a href="/aviso-legal" className="hover:text-enfasis1 transition duration-300">Aviso Legal</a>
                    <a href="/politica-cookies" className="hover:text-enfasis1 transition duration-300">Política de Cookies</a>
                    <a href="/politica-privacidad" className="hover:text-enfasis1 transition duration-300">Política de Privacidad</a>
                </div>
                <div className="text-center max-w-md">
                    <h2 className="text-xl font-titulo">Sobre Nosotros</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis felis ut bibendum bibendum. Aenean vel elit sed est facilisis vehicula.</p>
                </div>
            </footer>
        </div>
    );
}
    