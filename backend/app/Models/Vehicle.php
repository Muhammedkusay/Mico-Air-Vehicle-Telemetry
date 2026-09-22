<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'name',
        'system_id',
    ];

    public function telemetries() {
        return $this->hasMany(Telemetry::class);
    }
}
