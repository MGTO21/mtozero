<?php

namespace App\Observers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Pings the Next.js frontend to purge its ISR cache whenever
 * admin-managed content changes, so edits go live instantly.
 */
class FrontendCacheObserver
{
    public function saved($model): void
    {
        $this->revalidate();
    }

    public function deleted($model): void
    {
        $this->revalidate();
    }

    protected function revalidate(): void
    {
        $url = config('services.frontend.revalidate_url');
        $secret = config('services.frontend.revalidate_secret');

        if (! $url || ! $secret) {
            return;
        }

        try {
            Http::timeout(5)
                ->withHeaders(['x-revalidate-secret' => $secret])
                ->post($url);
        } catch (\Throwable $e) {
            // Never let a cache ping break an admin save
            Log::warning('Frontend revalidation failed: '.$e->getMessage());
        }
    }
}
