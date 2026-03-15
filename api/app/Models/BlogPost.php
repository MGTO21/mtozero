<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class BlogPost extends Model
{
    use HasTranslations;
    protected $fillable = ['title', 'content', 'slug', 'image', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public $translatable = ['title', 'content'];
}
