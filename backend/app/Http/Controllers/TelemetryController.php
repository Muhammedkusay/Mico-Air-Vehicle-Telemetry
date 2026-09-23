<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Telemetry;
use App\Models\Flight;
use Illuminate\Http\Request;

class TelemetryController extends Controller
{
    public function index($vehicleId, $flightId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }

        $flight = Flight::where('id', $flightId)
            ->where('vehicle_id', $vehicleId)
            ->first();

        if (!$flight) {
            return response()->json([
                'message' => 'Flight not found.',
            ], 404);
        }

        return response()->json([
            'data' => $flight->telemetries()->latest()->get(),
        ], 200);
    }

    public function store(Request $request, $vehicleId, $flightId) {
        $vehicle = Vehicle::find($vehicleId);

        if(!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }

        $flight = Flight::where('id', $flightId)
            ->where('vehicle_id', $vehicleId)
            ->first();

        if (!$flight) {
            return response()->json([
                'message' => 'Flight not found.',
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
            'flight_id' => $flight->id,
            ...$validated,
        ]);

        return response()->json([
            'data' => $telemetry
        ], 201);
    }

    public function latest($vehicleId, $flightId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                "message" => "Vehicle not found"
            ], 404);
        }

        $flight = Flight::where('id', $flightId)
            ->where('vehicle_id', $vehicleId)
            ->first();

        if (!$flight) {
            return response()->json([
                'message' => 'Flight not found.',
            ], 404);
        }

        $telemetry = $flight->telemetries()->latest()->first();

        if (!$telemetry) {
            return response()->json([
                "message" => "No telemetries found."
            ], 404);
        }

        return response()->json([
            'data' => $telemetry
        ], 200);
    }
}
