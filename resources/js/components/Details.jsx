import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

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
                setProfile(data.summonerData);
                setRank(data.summonerRank.length ? data.summonerRank[0] : null);
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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            


             <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col items-center md:items-start">
                    {profile && (
                        <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 mb-8">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${profile.profileIconId}.png`} alt="Profile Icon" className="w-32 h-32 rounded-full border-4 border-gray-300" />
                            <div className="text-center md:text-left mt-4 md:mt-0">
                                <h2 className="text-4xl font-bold">{profile.name}</h2>
                                <p className="text-xl text-gray-600">Nivel: {profile.summonerLevel}</p>
                            </div>
                            {rank && (
                                <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-auto space-y-2">
                                    <img src="/path/to/rank_icon.png" alt="Rank Icon" className="w-24 h-24" />
                                    <p className="text-xl">{rank.tier} {rank.rank} - {rank.leaguePoints} LP</p>
                                </div>
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
                                            <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/${getChampionImage(match, profile.puuid)}`} alt="Champion Icon" className="w-20 h-20 rounded-full border-2 border-gray-300" />
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

const getChampionImage = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    return participant ? `${participant.championName}.png` : '';
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

const getBuild = (match, puuid) => {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    if (!participant) return 'No disponible';
    return (
        <>
            {participant.item0 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item0}.png`} alt="Item 1" className="w-10 h-10 inline" />}
            {participant.item1 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item1}.png`} alt="Item 2" className="w-10 h-10 inline" />}
            {participant.item2 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item2}.png`} alt="Item 3" className="w-10 h-10 inline" />}
            {participant.item3 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item3}.png`} alt="Item 4" className="w-10 h-10 inline" />}
            {participant.item4 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item4}.png`} alt="Item 5" className="w-10 h-10 inline" />}
            {participant.item5 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item5}.png`} alt="Item 6" className="w-10 h-10 inline" />}
            {participant.item6 && <img src={`https://ddragon.leagueoflegends.com/cdn/12.10.1/img/item/${participant.item6}.png`} alt="Trinket" className="w-10 h-10 inline" />}
        </>
    );
};
