<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamp = false;

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function servicios()
    {
        return $this->hasMany(Servicio::class);
    }
}
