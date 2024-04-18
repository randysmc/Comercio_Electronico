<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inbox extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    public function remitente()
    {
        return $this->belongsTo(User::class, 'user_id_remitente');
    }

    // Definir la relación para el destinatario
    public function destinatario()
    {
        return $this->belongsTo(User::class, 'user_id_destinatario');
    }
    
}
