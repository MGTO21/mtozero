<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class PortfolioProject extends Model
{
    use HasTranslations;

    protected $fillable = [
        'title', 'description', 'image', 'url', 'is_published',
        // Case study fields
        'challenge', 'solution', 'results', 'client_name', 'duration', 'tech_stack', 'featured',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'featured' => 'boolean',
        'image' => 'array',
        'results' => 'array',
        'tech_stack' => 'array',
    ];

    public $translatable = ['title', 'description', 'challenge', 'solution'];
}
