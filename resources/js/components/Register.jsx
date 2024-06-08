import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

export function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gameName: '',
        tagLine: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Aquí puedes agregar la lógica para enviar los datos al servidor.
        // Para este ejemplo, simplemente redirigimos al perfil.
        route(`/profile/${formData.username}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Registro</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="text"
                        name="gameName"
                        placeholder="Nombre de Invocador"
                        value={formData.gameName}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <input
                        type="text"
                        name="tagLine"
                        placeholder="Etiqueta"
                        value={formData.tagLine}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 border-2 border-black rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}
