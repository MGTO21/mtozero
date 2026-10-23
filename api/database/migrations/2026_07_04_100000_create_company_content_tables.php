<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // آراء العملاء
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company')->nullable();
            $table->jsonb('role')->nullable();
            $table->jsonb('content');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // الأسئلة الشائعة
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->jsonb('question');
            $table->jsonb('answer');
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // عدادات/إحصائيات الشركة
        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->jsonb('label');
            $table->string('value');
            $table->string('suffix')->nullable();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort')->default(0);
            $table->timestamps();
        });

        // طلبات عروض الأسعار
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('project_type');
            $table->string('budget')->nullable();
            $table->string('timeline')->nullable();
            $table->text('details');
            $table->string('status')->default('new'); // new | reviewed | quoted | closed
            $table->timestamps();
        });

        // حقول دراسة الحالة على المشاريع
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->jsonb('challenge')->nullable();
            $table->jsonb('solution')->nullable();
            $table->json('results')->nullable();      // [{label:{ar,en}, value:"70%"}]
            $table->string('client_name')->nullable();
            $table->string('duration')->nullable();
            $table->json('tech_stack')->nullable();   // ["Laravel","Next.js",...]
            $table->boolean('featured')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->dropColumn(['challenge', 'solution', 'results', 'client_name', 'duration', 'tech_stack', 'featured']);
        });
        Schema::dropIfExists('quote_requests');
        Schema::dropIfExists('stats');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('testimonials');
    }
};
