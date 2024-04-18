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
            ->with('userComprador') // Cargar la relación de usuario comprador
            ->groupBy('user_id_comprador')
            ->get();

        return response()->json($totalDineroPorUsuario);
    }



    public function cantidadProductosCompradosPorUsuario()
    {
        $cantidadProductosPorUsuario = Transaccion::select('user_id_comprador', DB::raw('COUNT(id_producto) as cantidad_productos'))
            ->with('userComprador')
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

    public function promedioDineroGastadoPorUsuario()
    {
        $promedioDineroPorUsuario = Transaccion::select(
            'user_id_comprador',
            DB::raw('AVG(dinero) as promedio_dinero')
        )
            ->with('userComprador:id,name') // Solo cargar las columnas necesarias del usuario comprador
            ->groupBy('user_id_comprador')
            ->get();

        return response()->json($promedioDineroPorUsuario);
    }




    public function cantidadTransaccionesPorUsuario()
    {
        $cantidadTransaccionesPorUsuario = Transaccion::select('user_id_vendedor', DB::raw('COUNT(*) as cantidad_transacciones'))
        ->with('userVendedor')
            ->groupBy('user_id_vendedor')
            ->get();

        return response()->json($cantidadTransaccionesPorUsuario);
    }


    public function productosMasVendidos()
    {
        $productosMasVendidos = Transaccion::select('id_producto', DB::raw('COUNT(*) as cantidad_transacciones'))
            ->groupBy('id_producto')
            ->orderByDesc('cantidad_transacciones')
            ->get();

        return response()->json($productosMasVendidos);
    }

    public function totalDineroGanadoPorCategoria()
    {
        $totalDineroPorCategoria = Transaccion::join('productos', 'transaccions.id_producto', '=', 'productos.id')
            ->join('categorias', 'productos.categoria_id', '=', 'categorias.id')
            ->select('categorias.nombre', DB::raw('SUM(transaccions.dinero) as total_dinero'))
            ->groupBy('categorias.nombre')
            ->get();

        return response()->json($totalDineroPorCategoria);
    }


    public function usuariosQueMasHanVendido()
    {
        $usuariosQueMasHanVendido = Transaccion::select('user_id_vendedor', DB::raw('COUNT(*) as cantidad_transacciones'))
            ->groupBy('user_id_vendedor')
            ->orderByDesc('cantidad_transacciones')
            ->get();

        return response()->json($usuariosQueMasHanVendido);
    }

    public function distribucionVentasPorMes()
    {
        $distribucionVentasPorMes = Transaccion::select(
            DB::raw('YEAR(fecha) as anio'),
            DB::raw('MONTH(fecha) as mes'),
            DB::raw('SUM(dinero) as total_ventas')
        )
            ->groupBy(DB::raw('YEAR(fecha)'), DB::raw('MONTH(fecha)'))
            ->orderBy('anio')
            ->orderBy('mes')
            ->get();

        return response()->json($distribucionVentasPorMes);
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
