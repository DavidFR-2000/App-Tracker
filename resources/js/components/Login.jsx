import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import axios from 'axios';

export function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState(null); // Estado para el token CSRF
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener el token CSRF cuando el componente se monta
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/csrf-token', {
                    withCredentials: true // Asegúrate de incluir las credenciales si el servidor las requiere
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
            // Envía una solicitud POST al servidor para autenticar al usuario
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken // Incluye el token CSRF en el encabezado
                },
                withCredentials: true // Incluir credenciales si el servidor las requiere
            });

            if (response.data.status === 'success') {
                const usuario = {
                    username,
                    invocadorFoto: response.data.invocadorFoto // Suponiendo que la respuesta incluye la URL de la foto del invocador
                };
                localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                onLoginSuccess(usuario); // Llama a la función de callback para actualizar el usuario activo
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
        <div className="min-h-screen flex items-center justify-center bg-fondoWeb p-4">
            <div className="p-10 rounded-xl max-w-lg w-full"> {/* Eliminado shadow-lg */}
                <h1 className="font-titulo text-4xl font-bold text-enfasis1 mb-8 text-center">Iniciar Sesión</h1>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <button
                        type="submit"
                        className="bg-enfasis1 text-white py-4 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
