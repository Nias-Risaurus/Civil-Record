<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\MaintenanceRecord;
use App\Models\Assignment;
use Illuminate\Http\Request;

class OfficerController extends Controller
{
    // List tasks assigned to officer
    public function myTasks(Request $request)
    {
        $officerId = $request->user() ? $request->user()->id : 2; // fallback officer

        $tasks = Report::with(['category', 'facility', 'user'])
            ->where(function ($q) use ($officerId) {
                $q->where('assigned_officer_id', $officerId)
                  ->orWhereIn('status', ['assigned', 'in_progress', 'resolved']);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tasks,
        ]);
    }

    // Start working on task (Status -> in_progress)
    public function startWork(Request $request, $id)
    {
        $report = Report::findOrFail($id);
        $previous = $report->status;

        $report->status = 'in_progress';
        $report->save();

        Assignment::where('report_id', $report->id)->update([
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $request->user() ? $request->user()->id : null,
            'actor_name' => $request->user() ? $request->user()->name : 'Petugas Lapangan',
            'previous_status' => $previous,
            'new_status' => 'in_progress',
            'remarks' => 'Petugas telah tiba di lokasi dan memulai pengerjaan fisik.',
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengerjaan lapangan telah dimulai.',
            'data' => $report,
        ]);
    }

    // Resolve task with after image & notes (Status -> resolved)
    public function resolveWork(Request $request, $id)
    {
        $request->validate([
            'maintenance_notes' => 'required|string',
            'after_image_url' => 'nullable|string',
            'actions_taken' => 'nullable|string',
        ]);

        $report = Report::findOrFail($id);
        $previous = $report->status;

        $report->status = 'resolved';
        $report->maintenance_notes = $request->maintenance_notes;
        $report->after_image_url = $request->after_image_url ?? 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80';
        $report->save();

        MaintenanceRecord::create([
            'report_id' => $report->id,
            'facility_id' => $report->facility_id,
            'officer_id' => $request->user() ? $request->user()->id : 2,
            'actions_taken' => $request->actions_taken ?? $request->maintenance_notes,
            'materials_used' => $request->materials_used ?? 'Material standar perbaikan dinas',
            'performed_at' => now(),
            'verification_status' => 'pending_review',
        ]);

        Assignment::where('report_id', $report->id)->update([
            'status' => 'resolved',
            'resolved_at' => now(),
        ]);

        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $request->user() ? $request->user()->id : null,
            'actor_name' => $request->user() ? $request->user()->name : 'Petugas Lapangan',
            'previous_status' => $previous,
            'new_status' => 'resolved',
            'remarks' => 'Pekerjaan perbaikan fisik selesai. Bukti foto after telah diunggah: ' . $request->maintenance_notes,
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hasil perbaikan berhasil diajukan untuk validasi admin.',
            'data' => $report,
        ]);
    }
}

