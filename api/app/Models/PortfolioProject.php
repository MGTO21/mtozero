<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class PortfolioProject extends Model
{
    use HasTranslations;
    protected $fillable = ['title', 'description', 'image', 'url', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
        'image' => 'array',
    ];

    public $translatable = ['title', 'description'];
}
