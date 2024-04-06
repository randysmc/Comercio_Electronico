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
        //
        $data = Producto::all();
        return response()->json($data, 200);
    }

    public function userProducts()
    {
        $userId = Auth::id();
        
        $data = Producto::where('user_id', $userId)->get();

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
        $data = new Producto(($request->all()));
        
        //$data->user()->associate(Auth::user());
        $data->user_id = Auth::id();
        $data->disponible =1;

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
        return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id){
        $data = Producto::find($id);
        return response()->json($data,200);
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
