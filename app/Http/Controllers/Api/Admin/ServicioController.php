<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    //
    public function index()
    {
        $data = Servicio::all();
        return response()->json($data, 200);
    }

    public function userServices()
    {
        // Obtener el ID del usuario autenticado
        $userId = auth()->id();
        
        // Obtener los servicios del usuario autenticado
        $userServices = Servicio::where('user_id', $userId)->get();
        
        return response()->json($userServices, 200);
    }
    
    

    public function store(Request $request)
    {
        // Crear una nueva instancia de Servicio con los datos de la solicitud
        $servicio = new Servicio($request->all());
    
        // Asignar el ID del usuario autenticado al servicio
        $servicio->user_id = Auth::id();
    
        // Establecer la disponibilidad del servicio como 1
        $servicio->disponible = 1;
    
        // Establecer moneda_id como 3
        $servicio->moneda_id = 3;
    
        // Guardar la imagen si se proporciona en la solicitud
        if ($request->has('urlfoto')) {
            $image = $request->file('urlfoto');
    
            // Validar el tipo de archivo
            $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
            $extension = $image->getClientOriginalExtension();
            if (!in_array($extension, $allowedTypes)) {
                return response()->json(['error' => 'El formato de la imagen no es válido.'], 400);
            }
    
            // Guardar la imagen en la carpeta /img/servicio
            $folderPath = "/img/servicio/";
            $fileName = Str::slug($request->nombre) . '.' . $extension;
            $image->move(public_path($folderPath), $fileName);
    
            // Guardar la ruta de la imagen en la base de datos
            $servicio->urlfoto = $folderPath . $fileName;
        }
    
        // Guardar el servicio en la base de datos
        $servicio->save();
    
        // Devolver el servicio guardado en formato JSON con un código de estado 200
        return response()->json($servicio, 200);
    }
    

    public function show($id)
    {
        $data = Servicio::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        //validaciones

        $data = Servicio::find($id);
        $data->fill($request->all());

        if ($request->file) {
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

        return response()->json($data, 200);
    }

    public function destroy($id){
        $data = Servicio::find($id);
        $data->delete();
        return response()->json("Eliminado Correctamente",200);
    }
}
