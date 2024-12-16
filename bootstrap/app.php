<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__)) // Set the base path for the application (parent directory)
    ->withRouting( // Define the routing configuration for the application
        web: __DIR__.'/../routes/web.php', // The web routes file is located at '../routes/web.php'
        commands: __DIR__.'/../routes/console.php', // The console (artisan) commands file is located at '../routes/console.php'
        health: '/up', // The health check route is defined as '/up'
    )
    ->withMiddleware(function (Middleware $middleware) { // Define the middleware configuration
        $middleware->web(append: [ // Apply middleware to the web group of routes (web middleware stack)
            \App\Http\Middleware\HandleInertiaRequests::class, // Add Inertia.js handling middleware
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class, // Add headers for preloaded assets (related to asset management)
        ]);

        // You can add more middleware here if needed
    })
    ->withExceptions(function (Exceptions $exceptions) { // Define exception handling configuration
        // Customize exception handling here if needed
    })->create(); // Create and return the application instance
