<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Report;

class ReportApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->category = Category::create([
            'slug' => 'jalan_rusak',
            'name' => 'Jalan Rusak',
            'description' => 'Kerusakan jalan',
            'default_sla_hours' => 48,
        ]);

        $this->user = User::factory()->create([
            'role' => 'citizen',
        ]);
    }

    public function test_can_create_report_with_auto_generated_ticket()
    {
        $response = $this->actingAs($this->user)->postJson('/api/reports', [
            'title' => 'Lubang Jalan Besar',
            'category_id' => $this->category->id,
            'description' => 'Terdapat lubang sedalam 15cm membahayakan motor',
            'address' => 'Jl. Mawar No. 10',
            'latitude' => -6.917464,
            'longitude' => 107.619123,
            'priority' => 'high',
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                 ]);

        $ticket = $response->json('data.ticket_number');
        $this->assertMatchesRegularExpression('/^CR-\d{4}-\d{5}$/', $ticket);

        $this->assertDatabaseHas('reports', [
            'ticket_number' => $ticket,
            'status' => 'pending',
        ]);
    }

    public function test_can_track_report_by_ticket_number()
    {
        $report = Report::create([
            'ticket_number' => 'CR-2026-99999',
            'user_id' => $this->user->id,
            'category_id' => $this->category->id,
            'title' => 'Lampu Mati',
            'description' => 'Lampu padam',
            'address' => 'Jl. Sudirman',
            'latitude' => -6.920,
            'longitude' => 107.595,
            'status' => 'pending',
        ]);

        $response = $this->getJson('/api/track/CR-2026-99999');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'ticket_number' => 'CR-2026-99999',
                         'title' => 'Lampu Mati',
                     ],
                 ]);
    }
}
