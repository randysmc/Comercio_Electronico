<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Cartera;
use App\Models\Moneda;
use App\Models\MonedaCartera;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MonedaCarteraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function obtenerMonedas()
    {
        // Obtener el usuario autenticado
        $usuario = Auth::user();
    
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
    
        // Obtener la cartera asociada al usuario autenticado
        $cartera = Cartera::where('user_id', $usuario->id)->first();
    
        if (!$cartera) {
            return response()->json(['error' => 'No se encontró la cartera del usuario'], 404);
        }
    
        // Obtener las monedas asociadas a la cartera del usuario autenticado
        $monedasUsuario = $cartera->monedasCartera()->with('moneda')->get();
    
        // Devolver las monedas en formato JSON
        return response()->json($monedasUsuario);
    }
    


    public function manipularMonedas(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'id_moneda_aumentar' => 'required|integer',
            'id_moneda_disminuir' => 'required|integer',
            'cantidad' => 'required|numeric|min:0',
        ]);
    
        // Obtener el usuario autenticado
        $usuario = Auth::user();
    
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }
    
        // Obtener la cartera asociada al usuario autenticado
        $cartera = Cartera::where('user_id', $usuario->id)->first();
    
        if (!$cartera) {
            return response()->json(['error' => 'No se encontró la cartera del usuario'], 404);
        }
    
        // Obtener las cantidades actuales de las monedas
        $id_moneda_aumentar = $request->id_moneda_aumentar;
        $id_moneda_disminuir = $request->id_moneda_disminuir;
        $cantidad_aumentar = $request->cantidad;
    
        $moneda_aumentar = MonedaCartera::where('cartera_id', $cartera->id)
            ->where('moneda_id', $id_moneda_aumentar)
            ->first();
    
        $moneda_disminuir = MonedaCartera::where('cartera_id', $cartera->id)
            ->where('moneda_id', $id_moneda_disminuir)
            ->first();
    
        // Verificar si las restricciones de manipulación de monedas se cumplen
        if (
            ($id_moneda_aumentar == 1 && $id_moneda_disminuir == 2) ||  // Moneda 1 puede aumentar si disminuye moneda 2 (1 a 1)
            ($id_moneda_aumentar == 2 && $id_moneda_disminuir == 1) ||  // Moneda 2 puede aumentar si disminuye moneda 1 (1 a 1)
            ($id_moneda_aumentar == 2 && $id_moneda_disminuir == 3 && $cantidad_aumentar % 10 == 0) // Moneda 2 puede aumentar si disminuye moneda 3 (10 a 1)
        ) {
            // Realizar la manipulación de las cantidades
            DB::transaction(function () use ($moneda_aumentar, $moneda_disminuir, $cantidad_aumentar) {
                $cantidad_moneda_aumentar = $cantidad_aumentar;
                $cantidad_moneda_disminuir = $cantidad_aumentar;
    
                // Si se está aumentando la moneda 2 y disminuyendo la moneda 3
                if ($moneda_aumentar->moneda_id == 2 && $moneda_disminuir->moneda_id == 3) {
                    $cantidad_moneda_aumentar = $cantidad_aumentar / 10; // Convertir la cantidad aumentar según la relación 1 a 10
                }
    
                $moneda_aumentar->cantidad += $cantidad_moneda_aumentar;
                $moneda_disminuir->cantidad -= $cantidad_moneda_disminuir;
    
                $moneda_aumentar->save();
                $moneda_disminuir->save();
            });
    
            return response()->json(['message' => 'Operación realizada con éxito'], 200);
        } else {
            return response()->json(['error' => 'Restricciones de manipulación de monedas no cumplidas'], 400);
        }
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
