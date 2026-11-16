<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::with(['category'])->withCount('reports')->get();

        return response()->json([
            'success' => true,
            'data' => $facilities,
        ]);
    }

    public function show($id)
    {
        $facility = Facility::with(['category', 'reports', 'maintenanceRecords'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $facility,
        ]);
    }
}
