import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import axios from 'axios';

export function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/csrf-token', {
                    withCredentials: true
                });
                setCsrfToken(response.data.csrfToken);
            } catch (err) {
                console.error("Error fetching CSRF token:", err);
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                withCredentials: true
            });

            if (response.data.status === 'success') {
                const usuario = {
                    username,
                    invocadorFoto: response.data.invocadorFoto
                };
                localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                onLoginSuccess(usuario);
                route(`/profile/${usuario.username}`);
            } else {
                setError('Login failed: ' + response.data.message);
            }
        } catch (error) {
            console.error("There was an error!", error);
            if (error.response && error.response.data) {
                setError("Error: " + error.response.data.message);
            } else {
                setError("An error occurred during login. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-login-fondo bg-cover bg-center m-0 p-0">
            <div className="bg-secciones bg-opacity-90 w-full max-w-lg p-10 rounded-xl flex flex-col items-center justify-center">
                <h1 className="font-titulo text-4xl font-bold text-enfasis1 mb-8 text-center">Iniciar Sesión</h1>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-enfasis1 text-white py-4 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
