<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RiotApiController;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;



Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/summoner/puuid/{puuid}', [RiotApiController::class, 'getSummonerDataByPUUID']);
Route::get('/api/riot-id/puuid/{gameName}/{tagLine}', [RiotApiController::class, 'getPUUIDByRiotID']); // Nueva ruta para obtener el PUUID por Riot ID
Route::get('/api/matches/puuid/{puuid}', [RiotApiController::class, 'getMatchIDsByPUUID']); // Nueva ruta para obtener los Match IDs
Route::get('/api/match/details/{matchId}', [RiotApiController::class, 'getMatchDetails']); // Nueva ruta para obtener los detalles de una partida
Route::get('/api/profile/{gameName}/{tagLine}', [RiotApiController::class, 'getSummonerProfileAndMatches']); // Nueva ruta para obtener detalles del perfil y partidas por Riot ID

Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::get('/api/user/{username}', [UserController::class, 'getUserDetails']);
