<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioProjectController;
use App\Http\Controllers\Api\SaasProductController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\QuoteRequestController;

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

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/stats', [StatController::class, 'index']);

// Public Store Endpoints (rate-limited: 5 submissions per minute per IP)
Route::post('/contact', [ContactMessageController::class, 'store'])->middleware('throttle:5,1');
Route::post('/quote-requests', [QuoteRequestController::class, 'store'])->middleware('throttle:5,1');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
