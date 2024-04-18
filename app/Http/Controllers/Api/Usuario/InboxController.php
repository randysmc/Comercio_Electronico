<?php

namespace App\Http\Controllers\Api\Usuario;

use App\Http\Controllers\Controller;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InboxController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        // Obtener los mensajes recibidos por el usuario autenticado
        $mensajesRecibidos = Inbox::where('user_id_destinatario', $userId)->get();

        // Obtener los mensajes enviados por el usuario autenticado
        $mensajesEnviados = Inbox::where('user_id_remitente', $userId)->get();

        // Combinar los mensajes recibidos y enviados
        $todosLosMensajes = $mensajesRecibidos->merge($mensajesEnviados);

        // Devolver los mensajes en formato JSON
        return response()->json($todosLosMensajes, 200);
    }

    public function getMensajesPorUsuario()
    {
        try {
            // Obtener el ID del usuario autenticado
            $usuarioAutenticadoId = Auth::id();
    
            // Consultar los mensajes donde el usuario autenticado sea el remitente o el destinatario,
            // ordenados por fecha en orden descendente y cargar la relación con el usuario remitente y destinatario
            $mensajes = Inbox::where('user_id_remitente', $usuarioAutenticadoId)
            ->orWhere('user_id_destinatario', $usuarioAutenticadoId)
            ->with(['remitente', 'destinatario'])
            ->orderBy('fecha', 'desc')
            ->get();

        
    
            // Devolver los mensajes en formato JSON con un código de estado 200
            return response()->json($mensajes, 200);
        } catch (\Exception $e) {
            // Manejar cualquier error que pueda ocurrir durante la consulta de mensajes
            return response()->json(['message' => 'Error al obtener los mensajes', 'error' => $e->getMessage()], 500);
        }
    }
    
    
    




    public function getConversations()
    {
        // Obtenemos el ID del usuario autenticado
        $userId = Auth::id();

        // Obtener detalles del usuario autenticado
        $remitente = User::find($userId);

        // Obtener los mensajes enviados y recibidos por el usuario autenticado
        $mensajes = Inbox::where('user_id_remitente', $userId)
            ->orWhere('user_id_destinatario', $userId)
            ->orderBy('fecha')
            ->get();

        // Inicializar el array de conversaciones
        $conversaciones = [];

        // Agrupar los mensajes por destinatario
        foreach ($mensajes as $mensaje) {
            $destinatarioId = $mensaje->user_id_destinatario;

            // Obtener información del destinatario
            $destinatario = User::find($destinatarioId);

            // Crear el array de mensajes
            $mensajeArray = [
                'contenido' => $mensaje->contenido,
                'fecha' => $mensaje->fecha,
                'tipo' => $mensaje->user_id_remitente == $userId ? 'enviado' : 'recibido',
                'remitente_id' => $mensaje->user_id_
            ];

            // Verificar si ya existe una conversación con el destinatario
            if (isset($conversaciones[$destinatarioId])) {
                // Agregar el mensaje a la conversación existente
                $conversaciones[$destinatarioId]['mensajes'][] = $mensajeArray;
            } else {
                // Crear una nueva conversación
                $conversaciones[$destinatarioId] = [
                    'destinatario' => $destinatario->only(['id', 'name']),
                    'mensajes' => [$mensajeArray]
                ];
            }
        }

        // Devolver las conversaciones en formato JSON
        return response()->json([
            'remitente' => $remitente->only(['id', 'name']),
            'conversaciones' => array_values($conversaciones)
        ], 200);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //'fecha' => now()->toDateTimeString(),
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'contenido' => 'required|string',
            'user_id_destinatario' => 'required|exists:users,id',
        ]);

        try {
            // Crear una nueva instancia de Inbox con los datos de la solicitud
            $inbox = new Inbox($request->all());

            // Asignar el ID del usuario autenticado al remitente
            $inbox->user_id_remitente = Auth::id();

            // Establecer la fecha y hora actual
            $inbox->fecha = now()->toDateTimeString();

            // Guardar el mensaje de inbox en la base de datos
            $inbox->save();

            // Devolver el mensaje de inbox guardado en formato JSON con un código de estado 200
            return response()->json($inbox, 200);
        } catch (\Exception $e) {
            // Manejar cualquier error que pueda ocurrir durante la creación del mensaje
            return response()->json(['message' => 'Error al enviar el mensaje', 'error' => $e->getMessage()], 500);
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
