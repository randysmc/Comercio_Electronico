<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    //
    public function getRoles()
    {
        $roles = Role::pluck('name', 'id');
        return response()->json($roles);
    }
}
