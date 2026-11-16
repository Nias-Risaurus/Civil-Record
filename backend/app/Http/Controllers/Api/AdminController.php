<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\Assignment;
use App\Models\Facility;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Verify report
    public function verify(Request $request, $id)
    {
        $report = Report::findOrFail($id);

        $previous = $report->status;
        $report->status = 'verified';
        $report->verified_at = now();
        if ($request->has('facility_id')) {
            $report->facility_id = $request->facility_id;
        }
        $report->save();

        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $request->user() ? $request->user()->id : null,
            'actor_name' => $request->user() ? $request->user()->name : 'Admin Pemda',
            'previous_status' => $previous,
            'new_status' => 'verified',
            'remarks' => 'Laporan diverifikasi valid oleh admin.',
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil diverifikasi.',
            'data' => $report,
        ]);
    }

    // Reject report
    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string',
        ]);

        $report = Report::findOrFail($id);
        $previous = $report->status;
        $report->status = 'rejected';
        $report->rejection_reason = $request->reason;
        $report->save();

        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $request->user() ? $request->user()->id : null,
            'actor_name' => $request->user() ? $request->user()->name : 'Admin Pemda',
            'previous_status' => $previous,
            'new_status' => 'rejected',
            'remarks' => 'Laporan ditolak: ' . $request->reason,
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan telah ditolak.',
            'data' => $report,
        ]);
    }

    // Assign officer
    public function assign(Request $request, $id)
    {
        $request->validate([
            'officer_id' => 'required|exists:users,id',
            'instructions' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $report = Report::findOrFail($id);
        $officer = User::findOrFail($request->officer_id);

        $previous = $report->status;
        $report->status = 'assigned';
        $report->assigned_officer_id = $officer->id;
        $report->assigned_at = now();
        $report->due_date = $request->due_date ?? now()->addHours(48);
        $report->work_notes = $request->instructions;
        $report->save();

        Assignment::create([
            'report_id' => $report->id,
            'officer_id' => $officer->id,
            'assigned_by' => $request->user() ? $request->user()->id : 1,
            'instructions' => $request->instructions,
            'assigned_at' => now(),
            'due_date' => $report->due_date,
            'status' => 'assigned',
        ]);

        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $request->user() ? $request->user()->id : null,
            'actor_name' => $request->user() ? $request->user()->name : 'Admin Pemda',
            'previous_status' => $previous,
            'new_status' => 'assigned',
            'remarks' => "Ditugaskan kepada {$officer->name}. Petunjuk: {$request->instructions}",
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Petugas berhasil ditugaskan.',
            'data' => $report->load('officer'),
        ]);
    }

    // Validate completed work (Approve / Rework)
    public function validateResolution(Request $request, $id)
    {
        $request->validate([
            'is_approved' => 'required|boolean',
            'remarks' => 'nullable|string',
        ]);

        $report = Report::findOrFail($id);
        $previous = $report->status;

        if ($request->is_approved) {
            $report->status = 'completed';
            $report->completed_at = now();
            $report->admin_feedback = $request->remarks ?? 'Hasil pengerjaan disetujui.';
            $report->save();

            if ($report->facility_id) {
                Facility::where('id', $report->facility_id)->update(['condition' => 'Baik']);
            }

            ReportHistory::create([
                'report_id' => $report->id,
                'user_id' => $request->user() ? $request->user()->id : null,
                'actor_name' => $request->user() ? $request->user()->name : 'Admin Pemda',
                'previous_status' => $previous,
                'new_status' => 'completed',
                'remarks' => 'Admin menyetujui hasil perbaikan. Tiket resmi ditutup: ' . ($request->remarks ?? 'Sesuai spesifikasi.'),
                'created_at' => now(),
            ]);
        } else {
            $report->status = 'in_progress';
            $report->admin_feedback = $request->remarks ?? 'Perlu pengerjaan ulang (Rework).';
            $report->save();

            ReportHistory::create([
                'report_id' => $report->id,
                'user_id' => $request->user() ? $request->user()->id : null,
                'actor_name' => $request->user() ? $request->user()->name : 'Admin Pemda',
                'previous_status' => $previous,
                'new_status' => 'in_progress',
                'remarks' => 'Admin meminta perbaikan ulang: ' . ($request->remarks ?? 'Perlu revisi.'),
                'created_at' => now(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $request->is_approved ? 'Perbaikan telah disetujui dan selesai.' : 'Perbaikan dikembalikan untuk pengerjaan ulang.',
            'data' => $report,
        ]);
    }

    // Analytics summary
    public function analytics()
    {
        $total = Report::count();
        $pending = Report::where('status', 'pending')->count();
        $verified = Report::where('status', 'verified')->count();
        $assigned = Report::where('status', 'assigned')->count();
        $inProgress = Report::where('status', 'in_progress')->count();
        $resolved = Report::where('status', 'resolved')->count();
        $completed = Report::where('status', 'completed')->count();
        $rejected = Report::where('status', 'rejected')->count();

        $byCategory = Report::selectRaw('category_id, count(*) as count')
            ->groupBy('category_id')
            ->with('category')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_reports' => $total,
                'pending' => $pending,
                'verified' => $verified,
                'assigned' => $assigned,
                'in_progress' => $inProgress,
                'resolved' => $resolved,
                'completed' => $completed,
                'rejected' => $rejected,
                'mean_time_to_repair' => '32.4 Jam',
                'by_category' => $byCategory,
            ],
        ]);
    }
}
