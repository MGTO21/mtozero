<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::where('is_active', true)->get());
    }

    public function show(Service $service)
    {
        if (!$service->is_active) {
            abort(404);
        }
        return response()->json($service);
    }
}
