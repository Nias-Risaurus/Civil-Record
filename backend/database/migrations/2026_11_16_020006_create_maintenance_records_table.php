<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->onDelete('cascade');
            $table->foreignId('facility_id')->nullable()->constrained('facilities')->nullOnDelete();
            $table->foreignId('assignment_id')->nullable()->constrained('assignments')->nullOnDelete();
            $table->foreignId('officer_id')->constrained('users')->onDelete('cascade');
            $table->text('actions_taken');
            $table->text('materials_used')->nullable();
            $table->decimal('cost_estimate', 12, 2)->default(0);
            $table->timestamp('performed_at')->useCurrent();
            $table->enum('verification_status', ['pending_review', 'approved', 'rework_required'])->default('pending_review');
            $table->text('admin_feedback')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_records');
    }
};
