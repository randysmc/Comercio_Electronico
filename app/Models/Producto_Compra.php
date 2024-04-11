<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto_Compra extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    protected $table = 'productos_compras';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'urlfoto',
        'fecha_compra',
        'categoria_id',
        'user_id_comprador',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function userComprador()
    {
        return $this->belongsTo(User::class, 'user_id_comprador');
    }
}
