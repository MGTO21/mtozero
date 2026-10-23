<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Stat extends Model
{
    use HasTranslations;

    protected $fillable = ['label', 'value', 'suffix', 'is_published', 'sort'];

    protected $casts = [
        'is_published' => 'boolean',
        'sort' => 'integer',
    ];

    public $translatable = ['label'];
}
