<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Report;

class AdminOfficerWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->category = Category::create([
            'slug' => 'jalan_rusak',
            'name' => 'Jalan Rusak',
            'default_sla_hours' => 48,
        ]);

        $this->facility = Facility::create([
            'code' => 'FAC-001',
            'category_id' => $this->category->id,
            'name' => 'Ruas Jalan Mawar',
            'address' => 'Jl. Mawar',
            'latitude' => -6.917,
            'longitude' => 107.619,
            'condition' => 'Perlu Perbaikan',
        ]);

        $this->admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->officer = User::factory()->create([
            'role' => 'officer',
            'department' => 'Bina Marga',
        ]);

        $this->citizen = User::factory()->create([
            'role' => 'citizen',
        ]);

        $this->report = Report::create([
            'ticket_number' => 'CR-2026-00100',
            'user_id' => $this->citizen->id,
            'category_id' => $this->category->id,
            'facility_id' => $this->facility->id,
            'title' => 'Kerusakan Jalan',
            'description' => 'Lubang aspal',
            'address' => 'Jl. Mawar',
            'latitude' => -6.917,
            'longitude' => 107.619,
            'status' => 'pending',
        ]);
    }

    public function test_full_repair_lifecycle_from_pending_to_completed()
    {
        // 1. Admin verifies report
        $resVerify = $this->actingAs($this->admin)->patchJson("/api/admin/reports/{$this->report->id}/verify");
        $resVerify->assertStatus(200);
        $this->assertEquals('verified', $this->report->fresh()->status);

        // 2. Admin assigns officer
        $resAssign = $this->actingAs($this->admin)->postJson("/api/admin/reports/{$this->report->id}/assign", [
            'officer_id' => $this->officer->id,
            'instructions' => 'Gunakan aspal hotmix dan ratakan',
        ]);
        $resAssign->assertStatus(200);
        $this->assertEquals('assigned', $this->report->fresh()->status);
        $this->assertEquals($this->officer->id, $this->report->fresh()->assigned_officer_id);

        // 3. Officer starts work
        $resStart = $this->actingAs($this->officer)->patchJson("/api/officer/tasks/{$this->report->id}/start");
        $resStart->assertStatus(200);
        $this->assertEquals('in_progress', $this->report->fresh()->status);

        // 4. Officer resolves work with after photo & notes
        $resResolve = $this->actingAs($this->officer)->postJson("/api/officer/tasks/{$this->report->id}/resolve", [
            'maintenance_notes' => 'Pengaspalan tuntas 100% dan telah dipadatkan',
            'after_image_url' => 'https://example.com/after.jpg',
            'actions_taken' => 'Penambalan aspal hotmix',
        ]);
        $resResolve->assertStatus(200);
        $this->assertEquals('resolved', $this->report->fresh()->status);

        // 5. Admin validates and completes report
        $resValidate = $this->actingAs($this->admin)->patchJson("/api/admin/reports/{$this->report->id}/validate", [
            'is_approved' => true,
            'remarks' => 'Hasil pengerjaan dinilai baik dan sesuai spesifikasi dinas.',
        ]);
        $resValidate->assertStatus(200);
        $this->assertEquals('completed', $this->report->fresh()->status);

        // Facility condition is updated to 'Baik'
        $this->assertEquals('Baik', $this->facility->fresh()->condition);

        // Audit trail history has 5 entries
        $this->assertCount(5, $this->report->fresh()->histories);
    }
}

