<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\OfficerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FacilityController;

/*
|--------------------------------------------------------------------------
| API Routes for CivilRecord (v1)
|--------------------------------------------------------------------------
*/

// Public Authentication Endpoints
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Public Reference Endpoints
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/facilities', [FacilityController::class, 'index']);
Route::get('/facilities/{id}', [FacilityController::class, 'show']);

// Public Reports & Ticket Tracking Endpoints
Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);
Route::get('/track/{ticketNumber}', [ReportController::class, 'track']);
Route::post('/reports', [ReportController::class, 'store']);

// Authenticated Endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Admin Operations
    Route::prefix('admin')->group(function () {
        Route::patch('/reports/{id}/verify', [AdminController::class, 'verify']);
        Route::patch('/reports/{id}/reject', [AdminController::class, 'reject']);
        Route::post('/reports/{id}/assign', [AdminController::class, 'assign']);
        Route::patch('/reports/{id}/validate', [AdminController::class, 'validateResolution']);
        Route::get('/analytics', [AdminController::class, 'analytics']);
    });

    // Officer Operations
    Route::prefix('officer')->group(function () {
        Route::get('/tasks', [OfficerController::class, 'myTasks']);
        Route::patch('/tasks/{id}/start', [OfficerController::class, 'startWork']);
        Route::post('/tasks/{id}/resolve', [OfficerController::class, 'resolveWork']);
    });
});

// Also allow open access for testing if token not supplied
Route::prefix('test')->group(function () {
    Route::patch('/admin/reports/{id}/verify', [AdminController::class, 'verify']);
    Route::patch('/admin/reports/{id}/reject', [AdminController::class, 'reject']);
    Route::post('/admin/reports/{id}/assign', [AdminController::class, 'assign']);
    Route::patch('/admin/reports/{id}/validate', [AdminController::class, 'validateResolution']);
    Route::get('/admin/analytics', [AdminController::class, 'analytics']);
    Route::get('/officer/tasks', [OfficerController::class, 'myTasks']);
    Route::patch('/officer/tasks/{id}/start', [OfficerController::class, 'startWork']);
    Route::post('/officer/tasks/{id}/resolve', [OfficerController::class, 'resolveWork']);
});
