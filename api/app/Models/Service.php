<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;
    protected $fillable = ['title', 'description', 'icon', 'is_active', 'content', 'features'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public $translatable = ['title', 'description', 'content', 'features'];
}
