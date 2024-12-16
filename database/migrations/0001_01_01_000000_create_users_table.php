<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create the 'users' table to store user data such as name, email, and password
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key for the 'users' table (auto-incrementing integer)
            $table->string('name'); // User's name
            $table->string('email')->unique(); // User's email, must be unique
            $table->timestamp('email_verified_at')->nullable(); // Timestamp when email is verified, can be null
            $table->string('password'); // User's password (hashed)
            $table->rememberToken(); // Token used for the "remember me" functionality (session persistence)
            $table->timestamps(); // Automatically adds created_at and updated_at timestamps
        });

        // Create the 'password_reset_tokens' table to manage password reset tokens
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); // The primary key is the user's email
            $table->string('token'); // The token used to reset the password
            $table->timestamp('created_at')->nullable(); // Timestamp for when the reset token was created
        });

        // Create the 'sessions' table to track user sessions
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // The session ID (primary key)
            $table->foreignId('user_id')->nullable()->index(); // Foreign key to link session to user, nullable for guests
            $table->string('ip_address', 45)->nullable(); // Stores the user's IP address (supports both IPv4 and IPv6)
            $table->text('user_agent')->nullable(); // Stores the user's browser/device details
            $table->longText('payload'); // Session payload, can store any serialized session data
            $table->integer('last_activity')->index(); // Timestamp for the last session activity, indexed for quick lookup
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the 'users' table if it exists (used to rollback the migration)
        Schema::dropIfExists('users');
        
        // Drop the 'password_reset_tokens' table if it exists
        Schema::dropIfExists('password_reset_tokens');
        
        // Drop the 'sessions' table if it exists
        Schema::dropIfExists('sessions');
    }
};
