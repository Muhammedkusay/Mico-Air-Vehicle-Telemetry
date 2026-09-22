<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function index() {
        $vehicles = Vehicle::all();

        if(!$vehicles) {
            return response()->json([
                'message' => 'No vehicles found'
            ], 404);
        }

        return response()->json([
            'data' => $vehicles
        ], 200);
    }

    public function show(Request $request, $id) {
        $vehicle = Vehicle::find($id);

        if(!$vehicle) {
            return response()->json([
                'message' => 'Vehicle not found'
            ], 404);
        }

        return response()->json([
            'data' => $vehicle,
        ], 200);
    }
}
