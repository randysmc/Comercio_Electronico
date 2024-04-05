<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Psy\Readline\Hoa\Console;

class UserController extends Controller
{
    //Me muestra todos los usuarios
    public function index()
    {
        // Obtener todos los usuarios con sus relaciones de cartera y monedaCartera cargadas
        $data = User::with('cartera.monedasCartera.moneda')->get();
        
        return response()->json($data, 200);
    }

    //Me muestra solo un usuario por ID
    public function show($id){
        $data = User::find($id);
        return response()->json($data, 200);

    }

    //para actualizar
    public function update(Request $request, $id){
        //validación de datos

        $data = User::find($id);
        $data-> fill($request->all());
        $data-> save();

        return response()->json($data, 200);
    }

    public function store(Request $request){
        
    }
}
