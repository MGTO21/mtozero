<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    public function index()
    {
        return response()->json(PortfolioProject::where('is_published', true)->orderBy('created_at', 'desc')->get());
    }

    public function show(PortfolioProject $portfolioProject)
    {
        if (!$portfolioProject->is_published) {
            abort(404);
        }
        return response()->json($portfolioProject);
    }
}
