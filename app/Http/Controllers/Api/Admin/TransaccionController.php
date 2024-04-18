<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransaccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        // Obtener todas las transacciones con las relaciones de usuario vendedor, usuario comprador y producto
        $transacciones = Transaccion::with(['userVendedor', 'userComprador', 'producto'])->get();

        // Retornar las transacciones en formato JSON
        return response()->json($transacciones);
    }

    public function totalDineroPorUsuario()
    {
        $totalDineroPorUsuario = Transaccion::select('user_id_comprador', DB::raw('SUM(dinero) as total_dinero'))
            ->groupBy('user_id_comprador')
            ->get();

        return response()->json($totalDineroPorUsuario);
    }


    public function cantidadProductosCompradosPorUsuario()
    {
        $cantidadProductosPorUsuario = Transaccion::select('user_id_comprador', DB::raw('COUNT(id_producto) as cantidad_productos'))
            ->groupBy('user_id_comprador')
            ->get();

        return response()->json($cantidadProductosPorUsuario);
    }

    public function categoriasMasRepetidas()
    {
        $categoriasMasRepetidas = Transaccion::join('productos', 'transaccions.id_producto', '=', 'productos.id')
            ->join('categorias', 'productos.categoria_id', '=', 'categorias.id')
            ->select('categorias.id', 'categorias.nombre', DB::raw('COUNT(*) as cantidad_transacciones'))
            ->groupBy('categorias.id', 'categorias.nombre')
            ->orderByDesc('cantidad_transacciones')
            ->get();

        return response()->json($categoriasMasRepetidas);
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
