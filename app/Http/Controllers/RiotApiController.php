<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RiotApiController extends Controller
{
    // Método para obtener el PUUID usando el Riot ID (gameName y tagLine)
    public function getPUUIDByRiotID($gameName, $tagLine)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::get("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/$gameName/$tagLine", [
            'api_key' => $apiKey
        ]);

        if ($response->successful()) {
            $data = $response->json();
            return $data['puuid']; // Devuelve solo el PUUID
        }

        return null;
    }

    // Método para obtener datos del invocador por PUUID
    public function getSummonerDataByPUUID($puuid)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::get("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/$puuid", [
            'api_key' => $apiKey
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    // Método para obtener el rango del invocador por ID del invocador
    public function getSummonerRankBySummonerId($summonerId)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::get("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/$summonerId", [
            'api_key' => $apiKey
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    // Método para obtener los Match IDs usando el PUUID
    public function getMatchIDsByPUUID($puuid)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/$puuid/ids", [
            'api_key' => $apiKey
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return [];
    }

    // Método para obtener detalles de una partida específica por Match ID
    public function getMatchDetails($matchId)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::get("https://europe.api.riotgames.com/lol/match/v5/matches/$matchId", [
            'api_key' => $apiKey
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }

    // Método combinado para obtener la información completa después de buscar el usuario
    public function getSummonerProfileAndMatches($gameName, $tagLine)
    {
        // Obtener el PUUID por Riot ID
        $puuid = $this->getPUUIDByRiotID($gameName, $tagLine);
        
        if (!$puuid) {
            return response()->json(['error' => 'No se pudo obtener el PUUID del invocador'], 500);
        }

        // Obtener la información del invocador por PUUID
        $summonerData = $this->getSummonerDataByPUUID($puuid);

        if (!$summonerData) {
            return response()->json(['error' => 'No se pudo obtener la información del invocador'], 500);
        }

        // Obtener el rango del invocador por ID del invocador
        $summonerRank = $this->getSummonerRankBySummonerId($summonerData['id']);

        if (!$summonerRank) {
            $summonerRank = [];
        }

        // Obtener los Match IDs por PUUID
        $matchIDs = $this->getMatchIDsByPUUID($puuid);
        
        if (empty($matchIDs)) {
            return response()->json(['error' => 'No se pudo obtener los Match IDs'], 500);
        }

        // Limitar a las 5 partidas más recientes para evitar demasiadas solicitudes
        $matchIDs = array_slice($matchIDs, 0, 10);

        // Obtener detalles de las partidas
        $matchesDetails = [];
        foreach ($matchIDs as $matchId) {
            $matchDetails = $this->getMatchDetails($matchId);
            if ($matchDetails) {
                $matchesDetails[] = $matchDetails;
            }
        }

        // Devolver la información completa
        return response()->json([
            'summonerData' => $summonerData,
            'summonerRank' => $summonerRank,
            'matches' => $matchesDetails
        ]);
    }
}
