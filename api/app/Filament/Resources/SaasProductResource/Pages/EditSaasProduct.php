<?php

namespace App\Filament\Resources\SaasProductResource\Pages;

use App\Filament\Resources\SaasProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSaasProduct extends EditRecord
{
    use EditRecord\Concerns\Translatable;
    protected static string $resource = SaasProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
