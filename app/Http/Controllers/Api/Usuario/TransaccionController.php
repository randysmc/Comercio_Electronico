<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Producto_Compra;
use App\Models\Transaccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TransaccionController extends Controller
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

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        // Obtener los datos de la solicitud
        $fecha = $request->input('fecha');
        $dinero = $request->input('dinero');
        $user_id_vendedor = $request->input('user_id_vendedor');
        $user_id_comprador = $request->input('user_id_comprador');
        $id_producto = $request->input('id_producto');
    
        // Crear una nueva transacción
        $transaccion = new Transaccion([
            'fecha' => $fecha,
            'dinero' => $dinero,
            'user_id_vendedor' => $user_id_vendedor,
            'user_id_comprador' => $user_id_comprador,
            'id_producto' => $id_producto,
        ]);
    
        // Guardar la transacción en la base de datos
        $transaccion->save();
    
        // Marcar el producto como no disponible
        $producto = Producto::find($id_producto);
        if ($producto) {
            $producto->disponible = false; // o 0 si es un campo entero
            $producto->save();
        }
    
        // Crear un nuevo producto para el usuario comprador
        $productoComprado = new Producto_Compra([
            'nombre' => $producto->nombre,
            'descripcion' => $producto->descripcion,
            'precio' => $producto->precio,
            'urlfoto' => $producto->urlfoto,
            'fecha_compra' => now(), // Asignar la fecha actual
            'categoria_id' => $producto->categoria_id,
            'user_id_comprador' => $user_id_comprador,
            // Otros campos del producto comprado...
        ]);
        $productoComprado->save();
    
        // Retornar una respuesta con un mensaje de éxito y los detalles de la transacción creada
        return response()->json([
            'message' => 'Transacción guardada exitosamente',
            'transaccion' => $transaccion
        ], 200);
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
