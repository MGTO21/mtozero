<?php

namespace App\Providers;

use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\PortfolioProject;
use App\Models\SaasProduct;
use App\Models\Service;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Observers\FrontendCacheObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);

        // Purge the Next.js ISR cache instantly on any content change
        foreach ([
            BlogPost::class,
            Faq::class,
            PortfolioProject::class,
            SaasProduct::class,
            Service::class,
            SocialLink::class,
            Stat::class,
            Testimonial::class,
        ] as $model) {
            $model::observe(FrontendCacheObserver::class);
        }
    }
}
