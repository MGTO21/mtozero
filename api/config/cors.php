<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Only the actual frontend origin(s) may call the public API. Set
    | FRONTEND_URL (comma-separated for multiple origins) in .env.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['GET', 'POST'],

    'allowed_origins' => array_filter(explode(',', env('FRONTEND_URL', 'http://localhost:3000'))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
