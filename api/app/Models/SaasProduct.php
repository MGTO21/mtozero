<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class SaasProduct extends Model
{
    use HasTranslations;
    protected $fillable = ['name', 'description', 'pricing', 'features', 'slug', 'url', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public $translatable = ['name', 'description', 'pricing', 'features'];
}
