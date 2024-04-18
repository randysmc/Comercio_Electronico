<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\MonedaController;
use App\Http\Controllers\Api\Admin\ProductoController;
use App\Http\Controllers\Api\Admin\ServicioController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\TransaccionController;

use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;

use App\Http\Controllers\Api\Usuario\ProductoController as ProductoUsuario;
use App\Http\Controllers\Api\Usuario\ProductoCompraController as ProductoCompraUsuario;
use App\Http\Controllers\Api\Usuario\CategoriaController as CategoriaUsuario;
use App\Http\Controllers\Api\Usuario\ServicioController as ServicioUsuario;
use App\Http\Controllers\Api\Usuario\UserController as UserUsuario;
use App\Http\Controllers\Api\Usuario\TransaccionController as TransaccionUsuario;
use App\Http\Controllers\Api\Usuario\TruequeController as TruequeUsuario;
use App\Http\Controllers\Api\Usuario\InboxController as InboxUsuario;
//use App\Models\Producto_Compra;
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
    Route::apiResource('/admin/moneda', MonedaController::class);



    //::auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);




    //RUTAS PRIVADAS
    //Necesitan un token para poder funcionar
    Route::group(['middleware' => 'auth:sanctum'], function () {
        //::auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //Admin:
        Route::apiResource('/admin/user', UserController::class);
        Route::apiResource('/admin/categoria', CategoriaController::class);
        Route::apiResource('/admin/producto', ProductoController::class);
        Route::get('/admin/producto-no-aprobado', [ProductoController::class, 'productosNoPublicados']);
        Route::put('/admin/producto-no-aprobado/{id}', [ProductoController::class, 'aprobarProducto']);
        Route::apiResource('/admin/servicio', ServicioController::class);
        Route::apiResource('/admin/transaccion', TransaccionController::class);

        //User

        Route::apiResource('/usuario/producto', ProductoUsuario::class);
        Route::get('/usuario/productos', [ProductoUsuario::class, 'userProducts']);
        Route::put('producto/{id}/update-disponible', [ProductoUsuario::class, 'updateDisponible']);

        Route::apiResource('/usuario/producto-compra', ProductoCompraUsuario::class);

        Route::apiResource('/usuario/user', UserUsuario::class);
        Route::apiResource('/usuario/transaccion', TransaccionUsuario::class);

        Route::apiResource('/usuario/categoria', CategoriaUsuario::class);

        Route::apiResource('/usuario/servicio', ServicioUsuario::class);
        Route::get('/usuario/servicios', [ServicioUsuario::class, 'userServices']);
        Route::apiResource('/usuario/trueque', TruequeUsuario::class);
        Route::put('servicio/{id}/update-disponible', [ServicioUsuario::class, 'updateDisponible']);
        
        Route::apiResource('/usuario/inbox', InboxUsuario::class);
        Route::get('/usuario/conversaciones', [InboxUsuario::class, 'getMensajesPorUsuario']);





        //::rol voluntario

    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});





//vamos a tener dos tipos de rutas
//publicas y privadas
