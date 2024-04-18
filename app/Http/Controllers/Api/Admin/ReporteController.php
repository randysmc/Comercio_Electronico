<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reporte;
use App\Models\User;
use App\Models\Producto;

class ReporteController extends Controller
{
    /**
     * Generar un reporte de usuarios.
     */
    public function reporteUsuarios(Request $request)
    {
        // Obtener la información de los usuarios
        $usuarios = User::all();
    
        // Construir el contenido del reporte
        $informacion = "Reporte de Usuarios:\n\n";
        foreach ($usuarios as $usuario) {
            $informacion .= "ID: " . $usuario->id . ", Nombre: " . $usuario->name . ", Email: " . $usuario->email . "\n";
        }
    
        // Guardar el reporte en la base de datos
        Reporte::create([
            'tipo_reporte_id' => 1, // Tipo de reporte "usuarios"
            'informacion' => $informacion,
            'fecha' => now(),
            'user_id' => auth()->id(), // ID del usuario autenticado
        ]);
    
        return response()->json(['message' => 'Reporte de usuarios generado correctamente'], 200);
    }

    /**
     * Generar un reporte de productos.
     */
    public function reporteProductos(Request $request)
    {
        // Obtener la información de los productos
        $productos = Producto::all();

        // Construir el contenido del reporte
        $informacion = "Reporte de Productos:\n\n";
        foreach ($productos as $producto) {
            $informacion .= "ID: " . $producto->id . ", Nombre: " . $producto->nombre . ", Precio: " . $producto->precio . "\n";
        }

        // Guardar el reporte en la base de datos
        Reporte::create([
            'tipo' => 'productos',
            'informacion' => $informacion,
            'fecha' => now(),
        ]);

        return response()->json(['message' => 'Reporte de productos generado correctamente'], 200);
    }
}
