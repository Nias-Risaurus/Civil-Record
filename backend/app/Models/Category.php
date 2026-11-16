<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'icon_name',
        'department',
        'description',
        'default_sla_hours',
        'color',
        'is_active',
    ];

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function facilities()
    {
        return $this->hasMany(Facility::class);
    }
}

