<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use App\Models\Trueque;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TruequeController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Obtén la lista de trueques desde tu modelo Trueque
            $trueques = Trueque::all();
    
            // Retorna la lista de trueques en formato JSON
            return response()->json($trueques, 200);
        } catch (\Exception $e) {
            // Maneja cualquier error que ocurra
            return response()->json(['message' => 'Error en el servidor: ' . $e->getMessage()], 500);
        }
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
    
                $userVoluntario = User::find($request->input('user_id_voluntario'))->load('cartera.monedasCartera.moneda');
                $userPublicador = User::find($request->input('user_id_publicador'))->load('cartera.monedasCartera.moneda');
    
                // Obtener los demás datos de la solicitud
                $creditos = $request->input('creditos');
                $user_id_publicador = $userPublicador->id;
                $user_id_voluntario = $userVoluntario->id;
                $id_servicio = $request->input('id_servicio');
    
                // Verificar si el servicio está disponible
                $servicio = Servicio::find($id_servicio);
                if ($servicio && $servicio->disponible == 1) {
                    // Crear un nuevo trueque
                    $trueque = new Trueque([
                        'fecha' => now(),
                        'creditos' => $creditos,
                        'user_id_publicador' => $user_id_publicador,
                        'user_id_voluntario' => $user_id_voluntario,
                        'id_servicio' => $id_servicio,
                    ]);
    
                    // Guardar el trueque en la base de datos
                    $trueque->save();
                    $servicio->disponible = false;
                    $servicio->save();
    
                    //Realizamos la transaccion de creditos si el trueque se realizao correctamente
                    $creditosCantidadVoluntario = $userVoluntario->cartera->monedasCartera->firstWhere('moneda_id', 3)->cantidad;
                    $creditosPublicador = $userPublicador->cartera->monedasCartera->firstWhere('moneda_id', 3)->cantidad;
    
                    //Verficamos si el usuario solicitante tiene suficientes creditos para pagar
                    if($creditosPublicador >= $creditos){
                        $userPublicador->cartera->monedasCartera->firstWhere('moneda_id',3)->cantidad -= $creditos;
                        $userPublicador->cartera->monedasCartera->firstWhere('moneda_id',3)->save();
    
                        $userVoluntario->cartera->monedasCartera->firstWhere('moneda_id',3)->cantidad += $creditos;
                        $userVoluntario->cartera->monedasCartera->firstWhere('moneda_id',3)->save();
    
                        return response()->json([
                            'message' => 'Voluntariado realizado exitosamente',
                            'trueque' => $trueque,
                        ], 200);
                    } else{
                        //Si no tiene suficiente dinero
                        $trueque->delete();
    
                        return response()->json([
                            'message' => 'El usuario solicitante no tiene suficientes créditos'
                        ], 400);
                    }
                } else {
                    // Si el servicio no está disponible, retornar un mensaje de error
                    return response()->json([
                        'message' => 'El servicio no está disponible para realizar el trueque'
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
