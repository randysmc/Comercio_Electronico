<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index()
     {
         // Obtener el ID del usuario autenticado
         $userId = auth()->id();
      
         // Obtener todos los productos excluyendo los productos del usuario autenticado
         $productos = Producto::with('categoria', 'moneda', 'user') // Incluir la relación con el usuario propietario del producto
             ->select('id', 'nombre', 'descripcion', 'precio', 'urlfoto', 'user_id', 'moneda_id', 'categoria_id') // Seleccionar los campos deseados, incluyendo categoria_id
             ->where('user_id', '!=', $userId)
             ->where('disponible', 1) // Filtrar por productos disponibles
             ->get();
      
         return response()->json($productos, 200);
     }
     
     
     public function userProducts()
     {
         $userId = Auth::id();
         
         $data = Producto::with(['moneda', 'categoria'])->select('id', 'nombre', 'descripcion', 'precio', 'urlfoto', 'user_id', 'moneda_id')
                     ->where('user_id', $userId)
                     ->get();
     
         return response()->json($data, 200);
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
    public function store(Request $request){
        $data = new Producto($request->all());
        $data->user_id = Auth::id();
        $data->disponible = 1;
        $data->moneda_id = 2;
    
        if ($request->has('urlfoto')) {
            $image = $request->file('urlfoto');
    
            // Validar el tipo de archivo
            $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
            $extension = $image->getClientOriginalExtension();
            if (!in_array($extension, $allowedTypes)) {
                return response()->json(['error' => 'El formato de la imagen no es válido.'], 400);
            }
    
            // Guardar la imagen en la carpeta /img/producto
            $folderPath = "/img/producto/";
            $fileName = Str::slug($request->nombre) . '.' . $extension;
            $image->move(public_path($folderPath), $fileName);
    
            // Guardar la ruta de la imagen en la base de datos
            $data->urlfoto = $folderPath . $fileName;
        }
    
        $data->save();
        return response()->json($data, 200);
    }
    

    /**
     * Display the specified resource.
     */
    public function show($id){
        $data = Producto::with('moneda', 'user')->find(@$id);
        return response()->json($data,200);
    }

    public function updateDisponible($id)
    {
        //Busca el producto por id
        $producto = Producto::find($id);

        //Verificar si el producto existe
        if(!$producto){
            return response()->json(['error' => 'Producto no encontrado'],404);
        }

        //Modificar 
        $producto->disponible =0;
        $producto->save();

        return response()->json(['message' => 'Producto actualizado a no disponible']);

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
    public function update(Request $request, $id){
        $data = Producto::find($id);
        $data->fill($request->all());

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){
        $data = Producto::find($id);
        $data->delete();
        return response()->json("Producto eliminado correctamente",200);

    }
}
