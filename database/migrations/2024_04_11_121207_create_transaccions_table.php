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
            $table->date('fecha')->default(now()); // Valor predeterminado es la fecha actual
            $table->decimal('dinero', 10, 2);
            $table->foreignId('user_id_vendedor')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('user_id_comprador')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_producto')->references('id')->on('productos')->onUpdate('cascade')->onDelete('cascade');
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
