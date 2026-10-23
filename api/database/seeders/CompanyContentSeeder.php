<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use App\Models\Faq;
use App\Models\Stat;

class CompanyContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Testimonial::create([
            'name' => 'أحمد الطيب',
            'company' => 'ProClinic',
            'role' => ['ar' => 'المدير التنفيذي', 'en' => 'CEO'],
            'content' => [
                'ar' => 'فريق MTOZERO حوّل فكرتنا إلى نظام حقيقي يعمل بكفاءة عالية. التزام بالمواعيد وجودة كود ممتازة.',
                'en' => 'The MTOZERO team turned our idea into a real, highly efficient system. Great timeline commitment and excellent code quality.',
            ],
            'rating' => 5,
            'is_published' => true,
            'sort' => 1,
        ]);

        Testimonial::create([
            'name' => 'Sarah Mitchell',
            'company' => 'Cloud POS',
            'role' => ['ar' => 'مديرة المنتج', 'en' => 'Product Manager'],
            'content' => [
                'ar' => 'تواصل ممتاز طوال المشروع، وحلول تقنية ذكية لمشاكل معقدة واجهناها في إدارة المخزون.',
                'en' => 'Excellent communication throughout the project, with smart technical solutions to the complex inventory problems we faced.',
            ],
            'rating' => 5,
            'is_published' => true,
            'sort' => 2,
        ]);

        Testimonial::create([
            'name' => 'خالد عبدالرحمن',
            'company' => null,
            'role' => ['ar' => 'رائد أعمال', 'en' => 'Entrepreneur'],
            'content' => [
                'ar' => 'من الفكرة إلى الإطلاق في وقت قياسي. أنصح بشدة لأي مشروع تقني جاد.',
                'en' => 'From idea to launch in record time. Highly recommended for any serious tech project.',
            ],
            'rating' => 4,
            'is_published' => true,
            'sort' => 3,
        ]);

        Faq::create([
            'question' => [
                'ar' => 'كم تستغرق مدة تنفيذ المشروع عادة؟',
                'en' => 'How long does a typical project take?',
            ],
            'answer' => [
                'ar' => 'تختلف المدة حسب حجم المشروع، لكن معظم مشاريع الـMVP تستغرق بين 4 إلى 8 أسابيع من الاكتشاف حتى الإطلاق.',
                'en' => "It depends on project scope, but most MVP projects take 4 to 8 weeks from discovery to launch.",
            ],
            'is_published' => true,
            'sort' => 1,
        ]);

        Faq::create([
            'question' => [
                'ar' => 'هل تقدمون دعماً فنياً بعد الإطلاق؟',
                'en' => 'Do you offer support after launch?',
            ],
            'answer' => [
                'ar' => 'نعم، نقدم خطط دعم وصيانة مستمرة تشمل إصلاح الأخطاء وتطوير ميزات جديدة حسب الحاجة.',
                'en' => 'Yes, we offer ongoing support and maintenance plans covering bug fixes and new feature development as needed.',
            ],
            'is_published' => true,
            'sort' => 2,
        ]);

        Faq::create([
            'question' => [
                'ar' => 'ما هي التقنيات التي تستخدمونها؟',
                'en' => 'What technologies do you work with?',
            ],
            'answer' => [
                'ar' => 'نعمل بشكل رئيسي مع Next.js وLaravel وFlutter، مع اختيار التقنية المناسبة حسب متطلبات كل مشروع.',
                'en' => 'We primarily work with Next.js, Laravel, and Flutter, choosing the right stack based on each project’s requirements.',
            ],
            'is_published' => true,
            'sort' => 3,
        ]);

        Stat::create(['label' => ['ar' => 'مشروع منجز', 'en' => 'Projects Delivered'], 'value' => '40', 'suffix' => '+', 'is_published' => true, 'sort' => 1]);
        Stat::create(['label' => ['ar' => 'عميل راضٍ', 'en' => 'Happy Clients'], 'value' => '30', 'suffix' => '+', 'is_published' => true, 'sort' => 2]);
        Stat::create(['label' => ['ar' => 'سنوات خبرة', 'en' => 'Years Experience'], 'value' => '5', 'suffix' => '+', 'is_published' => true, 'sort' => 3]);
        Stat::create(['label' => ['ar' => 'رضا العملاء', 'en' => 'Client Satisfaction'], 'value' => '99', 'suffix' => '%', 'is_published' => true, 'sort' => 4]);
    }
}
