<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Testimonial extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'company', 'role', 'content', 'rating', 'is_published', 'sort'];

    protected $casts = [
        'is_published' => 'boolean',
        'rating' => 'integer',
        'sort' => 'integer',
    ];

    public $translatable = ['role', 'content'];
}
