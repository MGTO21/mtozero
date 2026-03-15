<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => ['en' => 'Custom Web Applications', 'ar' => 'تطبيقات الويب المخصصة'],
                'description' => [
                    'en' => 'Scalable, high-performance web platforms tailored specifically to your business logistics and user requirements.',
                    'ar' => 'منصات ويب عالية الأداء وقابلة للتوسع، مصممة خصيصاً لمتطلبات عملك اللوجستية وتجربة المستخدم.'
                ],
                'icon' => 'code',
                'is_active' => true,
            ],
            [
                'title' => ['en' => 'SaaS Product Development', 'ar' => 'تطوير منتجات الـ SaaS'],
                'description' => [
                    'en' => 'From cloud-architecture to recurring billing. We build complete Software-as-a-Service ecosystems from scratch.',
                    'ar' => 'من البنية التحتية السحابية وحتى أنظمة الدفع الدورية. نبني أنظمة برمجيات كخدمة متكاملة من الصفر.'
                ],
                'icon' => 'cloud',
                'is_active' => true,
            ],
            [
                'title' => ['en' => 'Digital Transformation', 'ar' => 'التحول الرقمي'],
                'description' => [
                    'en' => 'Modernizing legacy enterprise systems with smart, automated digital workflows and API integrations.',
                    'ar' => 'تحديث أنظمة الشركات القديمة بسير عمل رقمي ذكي ومؤتمت مع ربط تقنيات الـ API.'
                ],
                'icon' => 'layers',
                'is_active' => true,
            ],
        ];

        foreach ($services as $serviceData) {
            \App\Models\Service::create($serviceData);
        }
    }
}
