<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SaasProduct;
use Illuminate\Http\Request;

class SaasProductController extends Controller
{
    public function index()
    {
        return response()->json(SaasProduct::where('is_active', true)->get());
    }

    public function show($slug)
    {
        $product = SaasProduct::where('slug', $slug)->where('is_active', true)->firstOrFail();
        return response()->json($product);
    }
}
