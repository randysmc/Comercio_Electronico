<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Trueque extends Model
{
    use HasFactory;
    protected $fillable = [
        'fecha', 'creditos', 'user_id_publicador', 'user_id_voluntario', 'id_servicio'
    ];

    public $timestamps = false;

    public function userPublicador(): BelongsTo
    {
        return $this->belongsTo(Servicio::class, 'user_id_publicador');
    }

    public function userVoluntario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_voluntario');
    }

    public function servicio(): BelongsTo
    {
        return $this->belongsTo(Servicio::class, 'id_servicio');
    }

    public function reportes()
    {
        return $this->hasMany(Reporte::class);
    }
}
