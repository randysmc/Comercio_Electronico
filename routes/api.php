<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\ProductoController;
use App\Http\Controllers\Api\Admin\ServicioController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\Vendedor\ProductoController as ProductoVendedor;
use App\Http\Controllers\Api\Vendedor\ServicioController as ServicioVendedor;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    //RUTAS PUBLICAS
    //::public

    Route::get('/public/{slug}', [FrontController::class, 'categoria']);
    Route::get('/roles', [RoleController::class, 'getRoles']);
    
    //::rol admin
    //Route::apiResource('/admin/producto', ProductoController::class);
    //Route::apiResource('/admin/servicio', ServicioController::class);
    Route::apiResource('/admin/categoria', CategoriaController::class);
    

    //::auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    //Vendedor
    Route::apiResource('/vendedor/producto', ProductoVendedor::class);
    Route::apiResource('/vendedor/servicio', ServicioVendedor::class);


    //RUTAS PRIVADAS
    //Necesitan un token para poder funcionar
    Route::group(['middleware' => 'auth:sanctum'], function () {
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //Admin:
        Route::apiResource('/admin/user', UserController::class);


        //::rol comprador


        //::rol voluntario

    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});





//vamos a tener dos tipos de rutas
//publicas y privadas
