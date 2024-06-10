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
            alert("Las contraseñas no coinciden");
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
                route(`/profile/${usuario.username}`);
            } else {
                alert("Registro fallido: " + response.data.message);
            }
        } catch (error) {
            console.error("Hubo un error!", error);
            if (error.response && error.response.data) {
                alert("Error: " + JSON.stringify(error.response.data.errors));
            } else {
                alert("Ocurrió un error durante el registro. Por favor, intenta nuevamente.");
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-registro-fondo bg-cover bg-center m-0 p-0">
            <div className="bg-secciones bg-opacity-90 w-full h-full max-w-lg p-10 rounded-xl flex flex-col items-center justify-center">
                <h1 className="font-titulo text-4xl font-bold text-enfasis1 mb-8 text-center">Registro</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuario"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="text"
                        name="gameName"
                        placeholder="Nombre de Invocador"
                        value={formData.gameName}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <input
                        type="text"
                        name="tagLine"
                        placeholder="Etiqueta"
                        value={formData.tagLine}
                        onChange={handleChange}
                        className="bg-secciones text-texto text-2xl p-4 border-2 border-secciones rounded-full focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-enfasis1 text-white py-4 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2 w-full"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
}
