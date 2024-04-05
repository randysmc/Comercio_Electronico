<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartera extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];
    public $timestamps = false;

    //Una cartera
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function monedasCartera()
    {
        return $this->hasMany(MonedaCartera::class);
    }
}
