import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import axios from 'axios';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Envía una solicitud POST al servidor para autenticar al usuario
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username,
                password
            });

            if (response.data.status === 'success') {
                // Redirige al perfil del usuario
                route(`/profile/${username}`);
            } else {
                // Maneja el caso en que la autenticación falle
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
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Iniciar Sesión</h1>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-blue-800 transition-all"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
