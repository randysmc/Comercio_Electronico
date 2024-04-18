<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Psy\Readline\Hoa\Console;

class UserController extends Controller
{
    //Me muestra todos los usuarios
    //public function index()
    //{
    // Obtener todos los usuarios con sus relaciones de cartera y monedaCartera cargadas
    //  $data = User::with('cartera.monedasCartera.moneda')->get();

    //return response()->json($data, 200);
    //}



    public function index()
    {
        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        // Obtener todos los usuarios con sus relaciones de cartera y monedaCartera cargadas, excluyendo al usuario autenticado
        $data = User::with('cartera.monedasCartera.moneda')
            ->where('id', '!=', $userId)
            ->get();

        return response()->json($data, 200);
    }


    //Me muestra solo un usuario por ID
    public function show($id)
    {
        $data = User::find($id);
        return response()->json($data, 200);
    }


    public function getCartera(Request $request)
    {
        $user = $request->user(); // Obtener el usuario autenticado
        $cartera = $user->cartera; // Obtener la cartera del usuario

        if (!$cartera) {
            return response()->json(['message' => 'El usuario no tiene una cartera'], 404);
        }

        // Obtener las monedas en la cartera
        $monedasCartera = $cartera->monedaCarteras()->with('moneda')->get();

        return response()->json(['cartera' => $cartera, 'monedas' => $monedasCartera]);
    }

    //para actualizar
    public function update(Request $request, $id)
    {
        //validación de datos

        $data = User::find($id);
        $data->fill($request->all());
        $data->save();

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
    }
}
