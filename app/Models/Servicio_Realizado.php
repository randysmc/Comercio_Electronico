<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio_Realizado extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    protected $table = 'servicios_realizados';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'urlfoto',
        'fecha_voluntariado',
        'categoria_id',
        'user_id_voluntario',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function userComprador()
    {
        return $this->belongsTo(User::class, 'user_id_voluntario');
    }
}
