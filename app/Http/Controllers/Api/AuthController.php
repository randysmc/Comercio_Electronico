<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $response = ["success" => false];
    
        // Validación
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|unique:users|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|integer|between:1,4' // Validar que el valor sea un entero entre 1 y 4
        ]);
    
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
    
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
    
        // Crear el usuario
        $user = User::create($input);
        
        // Asignar el rol al usuario según el número proporcionado
        $roleId = $request->input('role');
        $role = Role::find($roleId);
        if ($role) {
            $user->assignRole($role->name); // Asignar el rol al usuario
        } else {
            $response['error'] = 'Rol no encontrado';
            return response()->json($response, 404);
        }
    
        $response["success"] = true;
        
        $response["token"] = $user->createToken("nacho")->plainTextToken;
    
        return response()->json($response, 200);
    }


    public function login(Request $request)
    {

        $response = ["success" => false];

        //validacion
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        //autenticación
        if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = auth()->user();

            //dd($user);
            $user->hasRole('comprador');
            //Envia token al front
            $response['token'] = $user->createToken("nacho")->plainTextToken;
            

            //envia al usuario
            $response['user'] = $user;
            $response['message'] = "Logueado";
            $response['success'] = true;
        }

        return response()->json($response, 200);
    }

    public function logout(){
        $response= ['success=> false'];
        auth()->user()->tokens()->delete();
        $response=[
            "success" => true,
            "message" => "Sesión cerrada"
        ];
        return response()->json($response, 200);
    }

}
