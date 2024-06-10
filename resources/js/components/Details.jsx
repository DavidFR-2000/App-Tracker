import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { ddragonImageUrl, ddragonRankedEmblemUrl } from './utils';

export function Details({ gameName, tagLine }) {
    const [profile, setProfile] = useState(null);
    const [rank, setRank] = useState(null);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [loadedMatches, setLoadedMatches] = useState(10); // Estado para el número de partidas cargadas

    useEffect(() => {
        const fetchProfileAndMatches = async () => {
            try {
                const response = await fetch(`/api/profile/${gameName}/${tagLine}`);
                if (!response.ok) {
                    throw new Error('Error fetching profile and match details');
                }
                const data = await response.json();
                console.log("Datos recibidos:", data);

                setProfile(data.summonerData);

                // Filtrar para encontrar el rango de "RANKED_SOLO_5x5"
                const soloRank = data.summonerRank.find(rank => rank.queueType === 'RANKED_SOLO_5x5');
                setRank(soloRank || null); // Si no hay "RANKED_SOLO_5x5", setea rank a null

                setMatches(data.matches);
            } catch (error) {
                setError('No se pudo obtener la información del perfil y las partidas');
                setProfile(null);
                setRank(null);
                setMatches([]);
            }
        };
        fetchProfileAndMatches();
    }, [gameName, tagLine]);

    const getItemImage = (itemId) => {
        return itemId ? ddragonImageUrl('item', itemId) : null;
    };

    const getChampionImage = (match, puuid) => {
        const participant = match.info.participants.find(p => p.puuid === puuid);
        return participant ? ddragonImageUrl('champion', participant.championName) : '';
    };

    const getBuild = (match, puuid) => {
        const participant = match.info.participants.find(p => p.puuid === puuid);
        if (!participant) return 'No disponible';

        return (
            <div className="flex space-x-1">
                {participant.item0 && (
                    <img
                        src={getItemImage(participant.item0)}
                        alt="Item 1"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item1 && (
                    <img
                        src={getItemImage(participant.item1)}
                        alt="Item 2"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item2 && (
                    <img
                        src={getItemImage(participant.item2)}
                        alt="Item 3"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item3 && (
                    <img
                        src={getItemImage(participant.item3)}
                        alt="Item 4"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item4 && (
                    <img
                        src={getItemImage(participant.item4)}
                        alt="Item 5"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item5 && (
                    <img
                        src={getItemImage(participant.item5)}
                        alt="Item 6"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
                {participant.item6 && (
                    <img
                        src={getItemImage(participant.item6)}
                        alt="Trinket"
                        className="w-10 h-10 rounded border border-gray-300"
                        loading="lazy"
                    />
                )}
            </div>
        );
    };

    const loadMoreMatches = () => {
        setLoadedMatches(loadedMatches + 10);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-detalles-fondo bg-cover bg-center m-0 p-8">
            <div className="w-full max-w-[1000px] px-4">
                {/* Datos de Usuario y Rango */}
                {profile && (
                    <div className="w-full p-6 rounded-xl bg-secciones bg-opacity-90 flex flex-col md:flex-row items-center md:items-start mb-8 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <img src={ddragonImageUrl('profileicon', profile.profileIconId)} alt="Profile Icon" className="w-32 h-32 rounded-full border-4 border-gray-300" />
                            <div className="text-left">
                                <h2 className="font-titulo text-4xl font-bold text-enfasis1">{gameName}</h2> {/* Ahora el nombre debe aparecer */}
                                <p className="font-parrafo text-xl text-gray-400">Nivel: {profile.summonerLevel}</p>
                            </div>
                        </div>
                        {rank ? (
                            <div className="flex flex-col items-center md:ml-auto space-y-2">
                                <img src={ddragonRankedEmblemUrl(rank.tier)} alt="Rank Icon" className="w-24 h-24" />
                                <p className="font-parrafo text-xl text-gray-400">{rank.tier} {rank.rank} - {rank.leaguePoints} LP</p>
                            </div>
                        ) : (
                            <p className="font-parrafo text-xl text-gray-400">Rango no disponible</p>
                        )}
                    </div>
                )}
            </div>

            {matches.length > 0 && (
                <div className="w-full max-w-[1000px] px-4">
                    <h2 className="font-titulo text-3xl font-semibold mb-6 text-center md:text-left">Partidas Recientes</h2>
                    <div className="flex flex-col space-y-6">
                        {matches.slice(0, loadedMatches).map((match, index) => (
                            <div
                                key={index}
                                className={`w-full p-6 rounded-xl ${isWin(match, profile.puuid) ? 'bg-enfasis2' : 'bg-enfasis1'} text-texto shadow-lg`}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 space-y-4 md:space-y-0 md:space-x-6">
                                    <h3 className="font-titulo text-2xl font-bold">Partida {index + 1}</h3>
                                    <p className="font-parrafo text-xl">{isWin(match, profile.puuid) ? 'Victoria' : 'Derrota'}</p>
                                </div>
                                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                                    <div className="flex flex-col items-center">
                                        <img loading="lazy" src={getChampionImage(match, profile.puuid)} alt="Champion Icon" className="w-20 h-20 rounded-full border-2 border-gray-300" />
                                        <p className="font-parrafo mt-2 text-lg">{getChampionName(match, profile.puuid)}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-parrafo text-lg mb-2"><strong>KDA:</strong> {getKDA(match, profile.puuid)}</p>
                                        <div className="font-parrafo text-lg mb-2"><strong>Build Usada:</strong> {getBuild(match, profile.puuid)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMoreMatches}
                            className="font-titulo text-lg bg-secciones text-texto py-3 px-6 rounded-full hover:bg-enfasis2 transition-all focus:outline-none focus:ring-4 focus:ring-enfasis2"
                        >
                            Cargar Más
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="font-parrafo text-red-500 text-center mt-8">{error}</p>}
        </div>
    );
}

// Funciones auxiliares para extraer datos de las partidas
const getChampionName = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? participant.championName : 'Desconocido';
};

const isWin = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? participant.win : false;
};

const getKDA = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    if (!participant) return '0/0/0';
    return `${participant.kills}/${participant.deaths}/${participant.assists}`;
};
