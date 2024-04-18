<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaccion extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $fillable = [
        'fecha', 'dinero', 'user_id_vendedor', 'user_id_comprador', 'id_producto'
    ];

    public $timestamps = false;

    public function userVendedor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_vendedor');
    }

    public function userComprador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_comprador');
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }

    public function reportes()
    {
        return $this->hasMany(Reporte::class);
    }
}
