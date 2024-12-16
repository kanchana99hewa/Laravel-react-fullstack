<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // This returns true, allowing any user to make this request
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // Email is required, must be a valid email format, and should exist in the 'users' table
            'email' => 'required|email|string|exists:users,email',

            // Password is required
            'password' => [
                'required',
            ],

            // The 'remember' field is optional and should be a boolean value
            'remember' => 'boolean',
        ];
    }
}
