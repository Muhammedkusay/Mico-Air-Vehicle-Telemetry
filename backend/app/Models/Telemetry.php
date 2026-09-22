<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Telemetry extends Model
{
    protected $fillable = [
        'vehicle_id',
        'mode',
        'armed',
        'latitude',
        'longitude',
        'altitude',
        'roll',
        'pitch',
        'yaw',
        'ground_speed',
        'heading',
        'climb',
        'battery_voltage',
        'battery_current',
        'battery_remaining',
        'gps_fix',
        'satellites',
    ];

    public function vehicle() {
        return $this->belongsTo(vehicle::class);
    }
}
