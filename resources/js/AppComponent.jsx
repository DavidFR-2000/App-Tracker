import { useState } from 'preact/hooks';

export function App() {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [profile, setProfile] = useState(null);
    const [rank, setRank] = useState(null);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

    const fetchProfileAndMatches = async (name, tag) => {
        try {
            const response = await fetch(`/api/profile/${name}/${tag}`);
            if (!response.ok) {
                throw new Error('Error fetching profile and match details');
            }
            const data = await response.json();
            setProfile(data.summonerData);
            setRank(data.summonerRank.length ? data.summonerRank[0] : null); // Muestra el primer rango encontrado si hay datos
            setMatches(data.matches);
        } catch (error) {
            setError('No se pudo obtener la información del perfil y las partidas');
            setProfile(null);
            setRank(null);
            setMatches([]);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Buscar Perfil y Partidas por Riot ID</h1>
                <div className="flex justify-center mb-6">
                    <input 
                        type="text" 
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        placeholder="Enter Game Name" 
                        className="border border-gray-300 p-2 rounded mr-2"
                    />
                    <input 
                        type="text" 
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        placeholder="Enter Tag Line" 
                        className="border border-gray-300 p-2 rounded mr-2"
                    />
                    <button onClick={() => fetchProfileAndMatches(gameName, tagLine)} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                        Buscar
                    </button>
                </div>

                {profile && (
                    <div className="mb-8 p-4 border rounded-lg shadow-md bg-gray-50">
                        <h2 className="text-2xl font-semibold mb-4">Perfil del Invocador</h2>
                        <div className="flex flex-col items-center">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${profile.profileIconId}.png`} alt="Profile Icon" className="w-20 h-20 rounded-full border-2 border-gray-300 mb-4" />
                            <div className="text-center">
                                <p className="text-xl"><strong>Nombre:</strong> {profile.name}</p>
                                <p className="text-lg"><strong>Nivel:</strong> {profile.summonerLevel}</p>
                                {rank && (
                                    <p className="text-lg"><strong>Rango:</strong> {rank.tier} {rank.rank} - {rank.leaguePoints} LP</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {matches.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Partidas Recientes</h2>
                        <ul className="space-y-4">
                            {matches.map((match, index) => (
                                <li key={index} className="p-4 border rounded-lg shadow-md bg-gray-50">
                                    <h3 className="text-xl font-bold mb-2">Partida {index + 1}</h3>
                                    <div className="flex items-center">
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${getChampionImage(match, profile.puuid)}`} alt="Champion Icon" className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4" />
                                        <div>
                                            <p className="text-lg"><strong>Campeón:</strong> {getChampionName(match, profile.puuid)}</p>
                                            <p className="text-lg"><strong>Resultado:</strong> {isWin(match, profile.puuid) ? 'Victoria' : 'Derrota'}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
}

// Función para obtener el nombre del campeón jugado
const getChampionName = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? participant.championName : 'Desconocido';
};

// Función para obtener el icono del campeón jugado
const getChampionImage = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? `${participant.championName}.png` : ''; // Asegúrate de que esto corresponda al nombre del archivo en el CDN de Riot
};

// Función para verificar si el invocador ganó la partida
const isWin = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? participant.win : false;
};
