<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Producto_Compra;
use App\Models\Transaccion;
use App\Models\User;
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
        try {
            // Verificar si el usuario está autenticado
            if (Auth::check()) {
                // Obtener el usuario autenticado con sus relaciones
                //$userComprador = Auth::user()->load('cartera.monedasCartera.moneda');
                $userVendedor = User::find($request->input('user_id_vendedor'))->load('cartera.monedasCartera.moneda');
                // Obtener el usuario vendedor
                $userComprador = User::find($request->input('user_id_comprador'))->load('cartera.monedasCartera.moneda');
    
                // Obtener los demás datos de la solicitud
                $dinero = $request->input('dinero');
                $user_id_comprador = $userComprador->id;
                $user_id_vendedor = $userVendedor->id;
                $id_producto = $request->input('id_producto');
    
                // Verificar si el producto está disponible
                $producto = Producto::find($id_producto);
                if ($producto && $producto->disponible == 1) {
                    // Crear una nueva transacción
                    $transaccion = new Transaccion([
                        'dinero' => $dinero,
                        'user_id_vendedor' => $user_id_vendedor,
                        'user_id_comprador' => $user_id_comprador,
                        'id_producto' => $id_producto,
                    ]);
    
                    // Guardar la transacción en la base de datos
                    $transaccion->save();
    
                    // Marcar el producto como no disponible
                    $producto->disponible = false;
                    $producto->save();
    
                    // Realizar la suma y resta de Bitcoin si la transacción se crea correctamente
                    // Filtrar las monedas de la cartera del usuario comprador para obtener la cantidad de Bitcoin
                    $bitcoinCantidadComprador = $userComprador->cartera->monedasCartera->firstWhere('moneda_id', 2)->cantidad;
    
                    // Filtrar las monedas de la cartera del usuario vendedor para obtener la cantidad de Bitcoin
                    $bitcoinCantidadVendedor = $userVendedor->cartera->monedasCartera->firstWhere('moneda_id', 2)->cantidad;
    
                    // Validar si el usuario comprador tiene suficiente dinero para realizar la transacción
                    if ($bitcoinCantidadComprador >= $dinero) {
                        // Restar la cantidad de dinero al usuario comprador
                        $userComprador->cartera->monedasCartera->firstWhere('moneda_id', 2)->cantidad -= $dinero;
                        $userComprador->cartera->monedasCartera->firstWhere('moneda_id', 2)->save();
    
                        // Sumar la cantidad de dinero al usuario vendedor
                        $userVendedor->cartera->monedasCartera->firstWhere('moneda_id', 2)->cantidad += $dinero;
                        $userVendedor->cartera->monedasCartera->firstWhere('moneda_id', 2)->save();
    
                        // Crear un nuevo producto para el usuario comprador
                        $productoComprado = new Producto_Compra([
                            'nombre' => $producto->nombre,
                            'descripcion' => $producto->descripcion,
                            'precio' => $producto->precio,
                            'urlfoto' => $producto->urlfoto,
                            'fecha_compra' => now(),
                            'categoria_id' => $producto->categoria_id,
                            'user_id_comprador' => $user_id_comprador,
                        ]);
                        $productoComprado->save();
    
                        // Retornar una respuesta con un mensaje de éxito y los detalles de la transacción creada
                        return response()->json([
                            'message' => 'Transacción guardada exitosamente',
                            'transaccion' => $transaccion,
                            'bitcoin_cantidad_comprador' => $bitcoinCantidadComprador,
                            'bitcoin_cantidad_vendedor' => $bitcoinCantidadVendedor
                        ], 200);
                    } else {
                        // Si el usuario comprador no tiene suficiente dinero, eliminar la transacción creada
                        $transaccion->delete();
    
                        // Retornar un mensaje de error
                        return response()->json([
                            'message' => 'El usuario comprador no tiene suficiente dinero para realizar la transacción'
                        ], 400);
                    }
                } else {
                    // Si el producto no está disponible, retornar un mensaje de error
                    return response()->json([
                        'message' => 'El producto no está disponible para realizar la transacción'
                    ], 400);
                }
            } else {
                // Si el usuario no está autenticado, retornar un mensaje de error
                return response()->json([
                    'message' => 'Usuario no autenticado'
                ], 401);
            }
        } catch (\Exception $e) {
            // Manejar el error
            return response()->json([
                'message' => 'Error en el servidor: ' . $e->getMessage()
            ], 500);
        }
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
