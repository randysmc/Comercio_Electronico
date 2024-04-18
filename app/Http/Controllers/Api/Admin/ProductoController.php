<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::with(['user', 'categoria'])
                              ->where('publicado', 1)
                              ->get();
    
        return response()->json($productos, 200);
    }

    public function productosNoPublicados()
{
    $productos = Producto::with(['user', 'categoria'])
                          ->where('publicado', 0)
                          ->get();

    return response()->json($productos, 200);
}

    

    public function store(Request $request){
        //validación
        $data = new Producto(($request->all()));

        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //process
            $folderPath = "/img/producto/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);

            $data->urlfoto = Str::slug($request->nombre) . '.' . $image_type;
        }

        $data->save();
        return response()->json($data,200);



    }

    public function show($id){
        $data = Producto::with('moneda', 'user')->find($id);
        return response()->json($data,200);
    }

    public function update(Request $request, $id)
    {
        $data = Producto::find($id);
        $data->fill(['publicado' => $request->publicado]); // Establecer el valor de publicado según la solicitud
    
        // Si se proporciona una imagen, procesarla y guardarla
        if ($request->has('urlfoto')) {
            $img = $request->urlfoto;
            $folderPath = "/img/producto/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);
    
            $data->urlfoto = Str::slug($request->nombre) . '.' . $image_type;
        }
    
        $data->save();
        return response()->json($data, 200);
    }
    
    public function aprobarProducto($id)
{
    $data = Producto::find($id);
    
    // Establecer el atributo 'publicado' como 1 para aprobar el producto
    $data->publicado = 1;

    // Guardar los cambios en la base de datos
    $data->save();

    // Devolver la respuesta JSON con el producto aprobado
    return response()->json($data, 200);
}

    public function destroy($id){
        $data = Producto::find($id);
        $data->delete();
        return response()->json("Producto eliminado correctamente",200);

    }
}
