<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Obtener el usuario autenticado con sus relaciones cargadas
    $user = Auth::user()->load('cartera.monedasCartera.moneda');

    // Verificar si el usuario está autenticado
    if ($user) {
        // Devolver la información del usuario con sus relaciones cargadas
        return response()->json($user, 200);
    } else {
        // Usuario no autenticado, devolver un mensaje de error
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
