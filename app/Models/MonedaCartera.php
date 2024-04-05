<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonedaCartera extends Model
{
    use HasFactory;
    protected $fillable = ['cantidad', 'cartera_id', 'moneda_id'];
    protected $guarded = [];
    public $timestamps = false;

    
    public function cartera(){
        return $this->belongsTo(Cartera::class);
    }

    public function moneda()
    {
        return $this->belongsTo(Moneda::class);
    }
}
