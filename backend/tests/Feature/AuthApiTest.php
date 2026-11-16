<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Warga Baru',
            'email' => 'warga.baru@example.com',
            'phone' => '081234567890',
            'password' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                 ])
                 ->assertJsonStructure([
                     'data' => [
                         'user' => ['id', 'name', 'email', 'role'],
                         'token',
                     ],
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'warga.baru@example.com',
            'role' => 'citizen',
        ]);
    }

    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@civilrecord.go.id',
            'password' => bcrypt('password123'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'test@civilrecord.go.id',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                 ])
                 ->assertJsonStructure([
                     'data' => [
                         'user' => ['id', 'name', 'email'],
                         'token',
                     ],
                 ]);
    }

    public function test_login_fails_with_invalid_credentials()
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(422);
    }
}
