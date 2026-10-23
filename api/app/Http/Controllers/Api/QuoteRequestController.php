<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'project_type' => 'required|string|max:100',
            'budget' => 'nullable|string|max:100',
            'timeline' => 'nullable|string|max:100',
            'details' => 'required|string|max:5000',
        ]);

        $quoteRequest = QuoteRequest::create($validated);

        return response()->json(['success' => true, 'message' => 'Your quote request has been received.', 'data' => $quoteRequest], 201);
    }
}
