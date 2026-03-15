<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PortfolioProject;
use Str;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PortfolioProject::create([
            'title' => [
                'ar' => 'منصة ذكاء اصطناعي للمؤسسات',
                'en' => 'Enterprise AI Platform'
            ],
            'description' => [
                'ar' => 'حل متكامل لإدارة وتحليل البيانات الضخمة للمؤسسات الكبرى باستخدام خوارزميات الذكاء الاصطناعي وبنية تحتية سحابية متقدمة.',
                'en' => 'An integrated solution for managing and analyzing big data for large enterprises using AI algorithms and advanced cloud infrastructure.'
            ],
            'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
            'url' => 'https://mtozero.com/projects/ai-platform',
            'is_published' => true
        ]);

        PortfolioProject::create([
            'title' => [
                'ar' => 'تطبيق تكسي ذكي (Ride-Hailing)',
                'en' => 'Smart Taxi App (Ride-Hailing)'
            ],
            'description' => [
                'ar' => 'منظومة حجز سيارات ذكية مع تتبع فوري، خوارزميات التسعير الديناميكي، ولوحة تحكم شاملة لإدارة الأسطول والسائقين.',
                'en' => 'A smart ride-hailing ecosystem featuring real-time tracking, dynamic pricing algorithms, and a comprehensive dashboard for fleet and driver management.'
            ],
            'image' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop',
            'url' => 'https://mtozero.com/projects/taxi-app',
            'is_published' => true
        ]);

        PortfolioProject::create([
            'title' => [
                'ar' => 'نظام نقاط البيع السحابي (Cloud POS)',
                'en' => 'Cloud POS System'
            ],
            'description' => [
                'ar' => 'نظام مبيعات حديث متصل بالسحابة يدعم الفوترة الإلكترونية، إدارة المخزون، وتقارير أداء حية مخصصة للمطاعم والمتاجر.',
                'en' => 'A modern cloud-connected point of sale system supporting e-invoicing, inventory management, and live performance reports tailored for restaurants and retail stores.'
            ],
            'image' => 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop',
            'url' => 'https://mtozero.com/projects/cloud-pos',
            'is_published' => true
        ]);

        \App\Models\SaasProduct::create([
            'name' => [
                'ar' => 'نظام إدارة العيادات (ProClinic)',
                'en' => 'ProClinic Management System'
            ],
            'slug' => 'proclinic',
            'description' => [
                'ar' => 'برنامج سحابي متكامل لإدارة العيادات الطبية، يشمل حجز المواعيد عبر الإنترنت، إدارة السجلات الطبية للمرضى (EMR)، ونظام فوترة متقدم.',
                'en' => 'An integrated cloud software for managing medical clinics, including online appointment booking, customized electronic medical records (EMR), and advanced billing.'
            ],
            'url' => 'https://proclinic.mtozero.com',
            'features' => [
                'ar' => ['حجز المواعيد إلكترونياً', 'سجل المريض الإلكتروني', 'إدارة الوصفات الطبية', 'تقارير مالية مفصلة'],
                'en' => ['Online Booking', 'Electronic Patient Records', 'Prescription Management', 'Detailed Financial Reports']
            ],
            'is_active' => true
        ]);

        \App\Models\BlogPost::create([
            'title' => [
                'ar' => 'مستقبل الذكاء الاصطناعي في قطاع الأعمال',
                'en' => 'The Future of AI in the Business Sector'
            ],
            'slug' => 'future-of-ai',
            'content' => [
                'ar' => 'يشهد الذكاء الاصطناعي تطوراً متسارعاً يغير شكل الأعمال التقليدية. في MTOZERO نتبنى أحدث التقنيات لتمكين الشركات من رفع كفاءتها التشغيلية...',
                'en' => 'Artificial intelligence is experiencing rapid development that is changing the shape of traditional businesses. At MTOZERO, we adopt the latest technologies to empower companies to increase their operational efficiency...'
            ],
            'image' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2670&auto=format&fit=crop',
            'is_published' => true
        ]);
    }
}
