<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'uploaded_by',
        'file_path',
        'file_type',
        'file_size',
        'stage',
        'caption',
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}

