import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Details } from './Details';
import { route } from 'preact-router';

export function Profile({ user }) {
    // Aquí puedes agregar lógica para obtener información adicional del usuario si es necesario.
    // Para este ejemplo, usamos 'user' como 'gameName' y una 'tagLine' predeterminada.

    const tagLine = "default"; // Puedes cambiar esto según tus necesidades

    useEffect(() => {
        // Simula un delay para obtener datos del perfil
        setTimeout(() => {
            route(`/details/${user}/${tagLine}`);
        }, 1000);
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Cargando perfil...</h1>
                {/* Aquí puedes mostrar un spinner o algún indicador de carga */}
            </div>
        </div>
    );
}
