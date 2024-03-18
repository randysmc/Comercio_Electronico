<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Creamos roles
#$role = Role::create(['name' => 'admin']);
#$role = Role::create(['name' => 'vendedor']);
#$role = Role::create(['name' => 'comprador']);
#$role = Role::create(['name' => 'voluntario']);


Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
