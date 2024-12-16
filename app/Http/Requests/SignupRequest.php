<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // This returns true, allowing any user to make this request
        // You could add custom logic to restrict who can submit the signup form if needed
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
            // 'name' is required and must be a string
            'name' => ['required', 'string'],

            // 'email' is required, must be a valid email format, and must be unique in the 'users' table
            'email' => ['required', 'email', 'unique:users,email'],

            // 'password' is required, must be confirmed (confirmation field: password_confirmation)
            // and must meet the specified criteria: at least 8 characters, contains letters, symbols, and numbers
            'password' => [
                'required',
                'confirmed', // Password must match the confirmation field
                Password::min(8) // Minimum length of 8 characters
                    ->letters() // Must contain letters
                    ->symbols() // Must contain symbols
                    ->numbers() // Must contain numbers
            ]
        ];
    }
}
