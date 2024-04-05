<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moneda extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'simbolo'];
    protected $guarded = [];
    public $timestamps = false;

    public function carteras()
    {
        return $this->hasMany(MonedaCartera::class);
    }
}
