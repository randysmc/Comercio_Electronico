<?php

namespace App\Models;


// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'username',
        'fecha_nacimiento',
        'urlfoto',
        'email',
        'password',
        'aprobado'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'fecha_nacimiento' => 'date', // Cast to date type
        'aprobado' => 'boolean', // Cast to boolean type
    ];



    public function products()
    {
        return $this->hasMany(Producto::class);
    }

    public function cartera()
    {
        return $this->hasOne(Cartera::class);
    }

    public function transaccionesVendedor(): HasMany
    {
        return $this->hasMany(Transaccion::class, 'user_id_vendedor');
    }

    public function transaccionesComprador(): HasMany
    {
        return $this->hasMany(Transaccion::class, 'user_id_comprador');
    }
    
    public function productosComprados(): HasMany
    {
        return $this->hasMany(Producto_Compra::class, 'user_id_comprador');
    }
}
