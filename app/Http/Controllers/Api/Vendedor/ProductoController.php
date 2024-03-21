<?php

namespace App\Http\Controllers\Api\Vendedor;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ProductoController extends Controller
{
    //
    public function index(){
        $data = Producto::all();
        return response()->json($data,200);
    }

    public function store(Request $request){
        $data = new Producto(($request->all()));
        
        //$data->user()->associate(Auth::user());

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

    public function show($id){
        $data = Producto::find($id);
        return response()->json($data,200);
    }

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

    public function destroy($id){
        $data = Producto::find($id);
        $data->delete();
        return response()->json("Producto eliminado correctamente",200);

    }
}

