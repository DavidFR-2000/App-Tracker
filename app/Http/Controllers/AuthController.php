<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    
    private function getPUUIDByRiotID($gameName, $tagLine)
    {
        $apiKey = env('RIOT_API_KEY');
        $response = Http::withHeaders(['X-Riot-Token' => $apiKey])
                        ->get("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/$gameName/$tagLine");

        if ($response->successful()) {
            $data = $response->json();
            return $data['puuid'];
        }

        return null;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        $user = User::where('username', $credentials['username'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Usuario autenticado correctamente
            return response()->json([
                'status' => 'success',
                'user' => [
                    'username' => $user->username,
                    'puuid' => $user->puuid, // Asegúrate de devolver el PUUID
                ],
                'token' => $user->createToken('LaravelSanctumAuth')->plainTextToken
            ]);
        }

        return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'gameName' => 'required|string|max:255',
            'tagLine' => 'required|string|max:255'
        ]);

        // Obtener el PUUID del usuario
        $puuid = $this->getPUUIDByRiotID($validatedData['gameName'], $validatedData['tagLine']);
        
        if (!$puuid) {
            return response()->json(['error' => 'No se pudo obtener el PUUID del invocador'], 500);
        }

        // Crear el nuevo usuario con el PUUID
        $user = User::create([
            'username' => $validatedData['username'],
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'gameName' => $validatedData['gameName'],
            'tagLine' => $validatedData['tagLine'],
            'puuid' => $puuid // Guardar el PUUID
        ]);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $user->createToken('LaravelSanctumAuth')->plainTextToken
        ]);
    }
}

