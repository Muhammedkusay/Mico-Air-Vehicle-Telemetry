<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Flight;

class Telemetry extends Model
{
    protected $fillable = [
        'flight_id',
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

    public function flight() {
        return $this->belongsTo(Flight::class);
    }
}
