<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user signup.
     *
     * @param SignupRequest $request
     * @return \Illuminate\Http\Response
     */
    public function signup(SignupRequest $request)
    {
        // Validate and retrieve the validated data
        $data = $request->validated();

        // Create a new user instance and save to the database
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'], // User's name
            'email' => $data['email'], // User's email
            'password' => bcrypt($data['password']), // Password is hashed using bcrypt
        ]);

        // Create a token for the newly created user using Laravel Sanctum
        $token = $user->createToken('main')->plainTextToken;

        // Return the user data along with the generated token
        return response(compact('user', 'token'));
    }

    /**
     * Handle user login.
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        // Validate and retrieve the credentials from the request
        $credentials = $request->validated();

        // Attempt to authenticate the user with the provided credentials
        if (!Auth::attempt($credentials)) {
            // If authentication fails, return a 422 error with a message
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        // Retrieve the authenticated user
        $user = Auth::user();

        // Generate a new token for the authenticated user
        $token = $user->createToken('main')->plainTextToken;

        // Return the authenticated user along with the generated token
        return response(compact('user', 'token'));
    }

    /**
     * Handle user logout.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Retrieve the current access token of the authenticated user
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = $request->user()->currentAccessToken();

        // Delete the current token to log the user out
        $token->delete();

        // Return a response with no content (status 204)
        return response('', 204);
    }
}
