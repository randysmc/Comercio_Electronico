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
        Schema::create('moneda_carteras', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad');
            $table->foreignId('cartera_id')->references('id')->on('carteras')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('moneda_id')->references('id')->on('monedas')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moneda_carteras');
    }
};
