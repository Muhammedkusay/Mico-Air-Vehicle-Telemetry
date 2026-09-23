<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Flight;

class Vehicle extends Model
{
    protected $fillable = [
        'name',
        'system_id',
    ];

    public function flights() {
        return $this->hasMany(Flight::class);
    }
}
