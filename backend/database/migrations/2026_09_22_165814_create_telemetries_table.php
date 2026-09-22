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
        Schema::create('telemetries', function (Blueprint $table) {
            $table->id();

            $table->foreignId('vehicle_id')
            ->constrained()
            ->cascadeOnDelete();
            
            $table->string('mode')->nullable();
            $table->boolean('armed')->nullable();

            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->decimal('altitude', 10, 2)->nullable();

            $table->decimal('roll', 8, 3)->nullable();
            $table->decimal('pitch', 8, 3)->nullable();
            $table->decimal('yaw', 8, 3)->nullable();

            $table->decimal('ground_speed', 8, 3)->nullable();
            $table->decimal('heading', 8, 3)->nullable();
            $table->decimal('climb', 8, 3)->nullable();

            $table->decimal('battery_voltage', 8, 3)->nullable();
            $table->decimal('battery_current', 8, 3)->nullable();
            $table->unsignedTinyInteger('battery_remaining')->nullable();

            $table->unsignedTinyInteger('gps_fix')->nullable();
            $table->unsignedTinyInteger('satellites')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telemetries');
    }
};
