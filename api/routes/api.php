<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioProjectController;
use App\Http\Controllers\Api\SaasProductController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ContactMessageController;

// Public Read-Only Endpoints
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::get('/portfolio', [PortfolioProjectController::class, 'index']);
Route::get('/portfolio/{portfolioProject}', [PortfolioProjectController::class, 'show']);

Route::get('/saas-products', [SaasProductController::class, 'index']);
Route::get('/saas-products/{slug}', [SaasProductController::class, 'show']);

Route::get('/blog', [BlogPostController::class, 'index']);
Route::get('/blog/{slug}', [BlogPostController::class, 'show']);

Route::get('/social-links', [App\Http\Controllers\Api\SocialLinkController::class, 'index']);

// Public Store Endpoint
Route::post('/contact', [ContactMessageController::class, 'store']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
