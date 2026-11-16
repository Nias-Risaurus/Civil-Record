<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'facility_id',
        'assignment_id',
        'officer_id',
        'actions_taken',
        'materials_used',
        'cost_estimate',
        'performed_at',
        'verification_status',
        'admin_feedback',
    ];

    protected $casts = [
        'performed_at' => 'datetime',
        'cost_estimate' => 'float',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class);
    }

    public function officer()
    {
        return $this->belongsTo(User::class, 'officer_id');
    }
}
