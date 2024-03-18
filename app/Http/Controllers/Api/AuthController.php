<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $response = ["success" => false];
        //validacion

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);


        $user = User::create($input);
        $user->assignRole('comprador');


        $response["success"] = "true";
        $response["token"] = $user->createToken("nacho")->plainTextToken;

        return response()->json($response, 200);
    }

    public function login(Request $request)
    {

        $response = ["success" => false];

        //validacion
        $validator = Validator::make($request->all(), [
            //'name'=>'required',
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
            $user->hasRole('comprador');
            //Envia token al frontedn
            $response["token"] = $user->createToken("nacho")->plainTextToken;

            //envia al usuario
            $response['user'] = $user;
            $response['success'] = true;
        }

        return response()->json($response, 200);
    }

    public function logout(Request $request)
    {
        //revocar un token
        $response = ["success"=>false];
        auth()->user()->tokens()->delete();
        $response = [
            "success"=>true,
            "message"=> "Sesión cerrada"
        ];
        return response()->json($response,200);
    }
}
