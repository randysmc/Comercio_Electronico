<?php

namespace App\Http\Controllers\Api\Vendedor;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    //
    public function index(){
        //Obtenemos el Id del usuario autenticado
        $userId = Auth::id();

        //Filtramos los productos por el ID del usuario autenticado
        $data = Servicio::where('user_id', $userId)->get();

        return response()->json($data, 200);
    }

    public function store(Request $request){
        $data = new Servicio(($request->all()));
        $data->user_id = Auth::id();
        $data->disponible =1;

        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //process
            $folderPath = "/img/servicio/";
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
        $data = Servicio::find($id);
        return response()->json($data,200);

    }

    public function update(Request $request, $id){
        $data = Servicio::find($id);
        $data->fill($request->all());

        if ($request->urlfoto) {
            $img = $request->urlfoto;
            //process
            $folderPath = "/img/servicio/";
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
        $data = Servicio::find($id);
        $data->delete();
        return response()->json("Servicio Eliminado Correctamente",200);
    }

}
