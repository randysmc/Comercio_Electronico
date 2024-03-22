<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaccions', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('dinero');
            $table->foreignId('user_id_vendedor')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('user_id_comprador')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('precio_producto_id')->references('id')->on('precio_productos')->onUpdate('cascade')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaccions');
    }
};
