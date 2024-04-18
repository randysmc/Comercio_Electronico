<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;


    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
