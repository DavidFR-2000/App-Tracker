import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { ddragonImageUrl, ddragonRankedEmblemUrl } from './utils';

export function Details({ gameName, tagLine }) {
    const [profile, setProfile] = useState(null);
    const [rank, setRank] = useState(null);
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);

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
            <>
                {participant.item0 && (
                    <img
                        src={getItemImage(participant.item0)}
                        alt="Item 1"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item1 && (
                    <img
                        src={getItemImage(participant.item1)}
                        alt="Item 2"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item2 && (
                    <img
                        src={getItemImage(participant.item2)}
                        alt="Item 3"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item3 && (
                    <img
                        src={getItemImage(participant.item3)}
                        alt="Item 4"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item4 && (
                    <img
                        src={getItemImage(participant.item4)}
                        alt="Item 5"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item5 && (
                    <img
                        src={getItemImage(participant.item5)}
                        alt="Item 6"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
                {participant.item6 && (
                    <img
                        src={getItemImage(participant.item6)}
                        alt="Trinket"
                        className="w-10 h-10 inline"
                        loading="lazy"
                    />
                )}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col items-center md:items-start">
                {profile && (
                    <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 mb-8">
                        <img src={ddragonImageUrl('profileicon', profile.profileIconId)} alt="Profile Icon" className="w-32 h-32 rounded-full border-4 border-gray-300" />
                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h2 className="text-4xl font-bold">{profile.name}</h2>
                            <p className="text-xl text-gray-600">Nivel: {profile.summonerLevel}</p>
                        </div>
                        {rank ? (
                            <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-auto space-y-2">
                                <img src={ddragonRankedEmblemUrl(rank.tier)} alt="Rank Icon" className="w-24 h-24" />
                                <p className="text-xl">{rank.tier} {rank.rank} - {rank.leaguePoints} LP</p>
                            </div>
                        ) : (
                            <p className="text-xl">Rango no disponible</p>
                        )}
                    </div>
                )}
            </div>

            {matches.length > 0 && (
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-4 text-center md:text-left">Partidas Recientes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {matches.map((match, index) => (
                            <div key={index} className="border rounded-lg p-6 bg-white shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">Partida {index + 1}</h3>
                                    <p className="text-xl">{isWin(match, profile.puuid) ? 'Victoria' : 'Derrota'}</p>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="flex flex-col items-center">
                                        <img loading="lazy" src={getChampionImage(match, profile.puuid)} alt="Champion Icon" className="w-20 h-20 rounded-full border-2 border-gray-300" />
                                        <p className="mt-2 text-lg">{getChampionName(match, profile.puuid)}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-lg mb-2"><strong>KDA:</strong> {getKDA(match, profile.puuid)}</p>
                                        <p className="text-lg mb-2"><strong>Build Usada:</strong> {getBuild(match, profile.puuid)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 text-center mt-8">{error}</p>}
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
