import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import axios from 'axios';

export function Profile({ user }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${user}`);
                if (response.data) {
                    const userData = response.data;
                    // Redirige a Details con el PUUID obtenido
                    route(`/details/${userData.gameName}/${userData.tagLine}`);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details', error);
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-8 text-center">Cargando perfil...</h1>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
}
