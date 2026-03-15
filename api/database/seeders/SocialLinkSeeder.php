<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            [
                'platform' => ['en' => 'GitHub', 'ar' => 'غيت هوب'],
                'url' => 'https://github.com',
                'icon' => 'github',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'platform' => ['en' => 'Twitter', 'ar' => 'تويتر'],
                'url' => 'https://twitter.com',
                'icon' => 'twitter',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'platform' => ['en' => 'LinkedIn', 'ar' => 'لينكد إن'],
                'url' => 'https://linkedin.com',
                'icon' => 'linkedin',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($links as $linkData) {
            \App\Models\SocialLink::create($linkData);
        }
    }
}
