<?php

namespace App\Filament\Resources\SaasProductResource\Pages;

use App\Filament\Resources\SaasProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateSaasProduct extends CreateRecord
{
    use CreateRecord\Concerns\Translatable;
    protected static string $resource = SaasProductResource::class;
}
