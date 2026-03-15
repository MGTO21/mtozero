<?php

namespace App\Filament\Resources\SaasProductResource\Pages;

use App\Filament\Resources\SaasProductResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSaasProducts extends ListRecords
{
    use ListRecords\Concerns\Translatable;
    protected static string $resource = SaasProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
