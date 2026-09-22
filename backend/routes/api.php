<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\TelemetryController;

Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);

Route::post('/vehicles/{vehicle}/telemetry', [TelemetryController::class, 'store']);
Route::get('/vehicles/{vehicle}/telemetry', [TelemetryController::class, 'latest']);
Route::get('/vehicles/{vehicle}/history', [TelemetryController::class, 'history']);
