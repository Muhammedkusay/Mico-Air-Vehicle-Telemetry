<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Vehicle;
use App\Models\Flight;

class FlightController extends Controller
{
    public function index($vehicleId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }

        if($vehicle->flights->isEmpty()) {
            return response()->json([
                'message' => 'No flights found for this vehicle.',
            ], 404);
        }

        return response()->json([
            'data' => $vehicle->flights,
        ], 200);
    }

    public function store(Request $request, $vehicleId) {
        $vehicle = Vehicle::find($vehicleId);

        if (!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found.',
            ], 404);
        }

        $flight = Flight::create([
            'vehicle_id' => $vehicleId,
        ]);

        return response()->json([
            'data' => $flight,
        ], 201);
    }

    public function show($vehicleId, $flightId) {
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
            'data' => $flight,
        ], 200);
    }
}
