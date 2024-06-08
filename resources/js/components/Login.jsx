import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para validar el login.
        // Para este ejemplo, simplemente redirigimos al perfil.
        route(`/profile/${username}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Iniciar Sesión</h1>
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
