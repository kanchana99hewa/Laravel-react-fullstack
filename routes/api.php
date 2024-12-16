<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Group of routes that require user authentication via Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Route for logging out the user
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Route for getting the authenticated user's information
    Route::get('/user', function (Request $request) {
        return $request->user();  // Return the authenticated user
    });

    // API resource route for handling CRUD operations on users
    Route::apiResource('/users', UserController::class);
});

// Routes for user signup and login (no authentication required)
Route::post('/signup', [AuthController::class, 'signup']);  // Route to register a new user
Route::post('/login', [AuthController::class, 'login']);  // Route for user login
