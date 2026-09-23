<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Vehicle;
use App\Models\Telemetry;

class Flight extends Model
{
    protected $fillable = [
        'vehicle_id',
    ];

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }

    public function telemetries() {
        return $this->hasMany(Telemetry::class);
    }
}
