<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SaasProductResource\Pages;
use App\Filament\Resources\SaasProductResource\RelationManagers;
use App\Models\SaasProduct;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\Concerns\Translatable;

class SaasProductResource extends Resource
{
    use Translatable;
    protected static ?string $model = SaasProduct::class;

    protected static ?string $navigationIcon = 'heroicon-o-cloud';
    protected static ?string $navigationGroup = 'المحتوى';

    // Arabic Plural & Singular Labels
    protected static ?string $navigationLabel = 'منتجات SaaS';
    protected static ?string $modelLabel = 'منتج SaaS';
    protected static ?string $pluralModelLabel = 'منتجات SaaS';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Textarea::make('name')
                    ->label('اسم المنتج')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('description')
                    ->label('وصف المنتج')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('pricing')
                    ->label('السعر (مثلاً: يبدأ من 49$)')
                    ->columnSpanFull(),
                Forms\Components\Repeater::make('features')
                    ->label('المميزات')
                    ->schema([
                        Forms\Components\TextInput::make('item')
                            ->label('الميزة')
                            ->required()
                    ])
                    ->formatStateUsing(function ($state) {
                        return collect((array) $state)
                            ->map(function ($item) {
                                if (is_string($item)) {
                                    return ['item' => $item];
                                }
                                return $item;
                            })
                            ->toArray();
                    })
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('slug')
                    ->label('الرابط المختصر (Slug)')
                    ->required(),
                Forms\Components\TextInput::make('url')
                    ->label('رابط المشروع المباشر'),
                Forms\Components\Toggle::make('is_active')
                    ->label('مفعل؟')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('اسم المنتج')
                    ->searchable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('slug')
                    ->label('الرابط المختصر')
                    ->searchable(),
                Tables\Columns\TextColumn::make('url')
                    ->label('الرابط المباشر')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('مفعل')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('تاريخ التحديث')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSaasProducts::route('/'),
            'create' => Pages\CreateSaasProduct::route('/create'),
            'edit' => Pages\EditSaasProduct::route('/{record}/edit'),
        ];
    }
}
