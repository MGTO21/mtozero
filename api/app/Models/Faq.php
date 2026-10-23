<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Faq extends Model
{
    use HasTranslations;

    protected $fillable = ['question', 'answer', 'is_published', 'sort'];

    protected $casts = [
        'is_published' => 'boolean',
        'sort' => 'integer',
    ];

    public $translatable = ['question', 'answer'];
}
