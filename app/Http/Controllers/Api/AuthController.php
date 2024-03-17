<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function register(Request $request)
    {

        //validacion

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response,200);
        }

        $response = ["success" => "false"];

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);


        $user = User::create($input);
        $user->assignRole('comprador');


        $response["success"] = "true";
        //$response["token"] = $user->createToken("nacho")->plainTextToken;

        return response()->json($response, 200);
    }
}
