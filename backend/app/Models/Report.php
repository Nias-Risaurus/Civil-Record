<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'user_id',
        'category_id',
        'facility_id',
        'title',
        'description',
        'address',
        'latitude',
        'longitude',
        'status',
        'priority',
        'rejection_reason',
        'assigned_officer_id',
        'assigned_at',
        'due_date',
        'work_notes',
        'maintenance_notes',
        'admin_feedback',
        'before_image_url',
        'after_image_url',
        'verified_at',
        'completed_at',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'assigned_at' => 'datetime',
        'due_date' => 'datetime',
        'verified_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function officer()
    {
        return $this->belongsTo(User::class, 'assigned_officer_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function facility()
    {
        return $this->belongsTo(Facility::class);
    }

    public function media()
    {
        return $this->hasMany(ReportMedia::class);
    }

    public function histories()
    {
        return $this->hasMany(ReportHistory::class)->orderBy('created_at', 'asc');
    }

    public function assignment()
    {
        return $this->hasOne(Assignment::class);
    }

    public function maintenanceRecord()
    {
        return $this->hasOne(MaintenanceRecord::class);
    }
}
