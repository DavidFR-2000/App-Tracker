import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import axios from 'axios';

export function Register({ onRegisterSuccess }) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                gameName: formData.gameName,
                tagLine: formData.tagLine
            });

            if (response.data.status === 'success') {
                const usuario = {
                    username: formData.username,
                    invocadorFoto: response.data.invocadorFoto // Suponiendo que la respuesta incluye la URL de la foto del invocador
                };
                localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                onRegisterSuccess(usuario); // Llama a la función de callback para actualizar el usuario activo
            } else {
                alert("Registration failed: " + response.data.message);
            }
        } catch (error) {
            console.error("There was an error!", error);
            if (error.response && error.response.data) {
                alert("Error: " + JSON.stringify(error.response.data.errors));
            } else {
                alert("An error occurred during registration. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-fondoWeb p-4">
            <div className="p-10 rounded-xl max-w-lg w-full"> {/* Eliminado bg-white y shadow-lg */}
                <h1 className="font-titulo text-4xl font-bold text-enfasis1 mb-8 text-center">Registro</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="text"
                        name="gameName"
                        placeholder="Nombre de Invocador"
                        value={formData.gameName}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <input
                        type="text"
                        name="tagLine"
                        placeholder="Etiqueta"
                        value={formData.tagLine}
                        onChange={handleChange}
                        className="bg-transparent text-texto text-2xl p-4 mb-4 border border-black rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-4 px-6 rounded-full hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-500"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}