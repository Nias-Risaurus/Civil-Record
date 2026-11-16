<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\Notification;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::with(['category', 'facility', 'user', 'officer']);

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('ticket_number', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $reports = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $reports,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'before_image_url' => 'nullable|string',
        ]);

        // Generate Ticket Number: CR-YYYY-NNNNN (Collision-Proof)
        $year = date('Y');
        $latestReport = Report::where('ticket_number', 'like', "CR-{$year}-%")
            ->orderByDesc('id')
            ->first();

        $seq = 1;
        if ($latestReport && preg_match('/CR-\d{4}-(\d+)/', $latestReport->ticket_number, $matches)) {
            $seq = intval($matches[1]) + 1;
        }

        do {
            $ticketNumber = sprintf('CR-%s-%05d', $year, $seq);
            $seq++;
        } while (Report::where('ticket_number', $ticketNumber)->exists());

        $userId = $request->user() ? $request->user()->id : 4; // fallback citizen

        $report = Report::create([
            'ticket_number' => $ticketNumber,
            'user_id' => $userId,
            'category_id' => $request->category_id,
            'facility_id' => $request->facility_id,
            'title' => $request->title,
            'description' => $request->description,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => 'pending',
            'priority' => $request->priority ?? 'medium',
            'before_image_url' => $request->before_image_url ?? 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
        ]);

        // Log initial history
        ReportHistory::create([
            'report_id' => $report->id,
            'user_id' => $userId,
            'actor_name' => $request->user() ? $request->user()->name : 'Citizen',
            'previous_status' => null,
            'new_status' => 'pending',
            'remarks' => 'Laporan kerusakan fasilitas publik dibuat dan menunggu verifikasi.',
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dibuat.',
            'data' => $report->load(['category', 'facility', 'histories']),
        ], 201);
    }

    public function show($id)
    {
        $report = Report::with(['category', 'facility', 'user', 'officer', 'histories', 'media'])
            ->where('id', $id)
            ->orWhere('ticket_number', $id)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $report,
        ]);
    }

    public function track($ticketNumber)
    {
        $report = Report::with(['category', 'facility', 'user', 'officer', 'histories'])
            ->where('ticket_number', strtoupper(trim($ticketNumber)))
            ->first();

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Laporan tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $report,
        ]);
    }
}

