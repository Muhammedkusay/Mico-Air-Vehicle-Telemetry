<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Telemetry;
use Illuminate\Http\Request;

class TelemetryController extends Controller
{
    public function store(Request $request, $vehicleId) {
        $vehicle = Vehicle::find($vehicleId);

        if(!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }

        $validated = $request->validate([
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'altitude' => 'nullable|numeric',

            'roll' => 'nullable|numeric',
            'pitch' => 'nullable|numeric',
            'yaw' => 'nullable|numeric',

            'ground_speed' => 'nullable|numeric',
            'heading' => 'nullable|numeric',
            'climb' => 'nullable|numeric',

            'battery_voltage' => 'nullable|numeric',
            'battery_current' => 'nullable|numeric',
            'battery_remaining' => 'nullable|integer|min:0|max:100',

            'gps_fix' => 'nullable|integer|min:0',
            'satellites' => 'nullable|integer|min:0',

            'mode' => 'nullable|string|max:50',
            'armed' => 'nullable|boolean',
        ]);

        $telemetry = Telemetry::create([
            'vehicle_id' => $vehicle->id,
            ...$validated,
        ]);

        return response()->json([
            'data' => $telemetry
        ], 201);
    }

    public function latest($vehicleId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                "message" => "Vehicle not found"
            ], 404);
        }

        $telemetry = $vehicle->telemetries()
            ->latest()
            ->first();

        if (!$telemetry) {
            return response()->json([
                "message" => "No telemetries found for this vehicle"
            ], 404);
        }

        return response()->json([
            'data' => $telemetry
        ], 200);
    }

    public function history($vehicleId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }
        
        $telemetries = $vehicle->telemetries()
            ->latest()
            ->get();
        
        if (!$telemetries) {
            return response()->json([
                'message' => 'No telemetries found for this vehicle.',
            ], 404);
        }

        return response()->json([
            'data' => $telemetries,
        ], 200);
    }
}
