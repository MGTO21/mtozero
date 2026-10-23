<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StatResource\Pages;
use App\Models\Stat;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Concerns\Translatable;

class StatResource extends Resource
{
    use Translatable;

    protected static ?string $model = Stat::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationGroup = 'المحتوى';

    protected static ?string $navigationLabel = 'إحصائيات الشركة';
    protected static ?string $modelLabel = 'إحصائية';
    protected static ?string $pluralModelLabel = 'إحصائيات الشركة';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('label')
                    ->label('التسمية')
                    ->required(),
                Forms\Components\TextInput::make('value')
                    ->label('القيمة')
                    ->placeholder('e.g. 120, 99.9')
                    ->required(),
                Forms\Components\TextInput::make('suffix')
                    ->label('اللاحقة')
                    ->placeholder('e.g. +, %'),
                Forms\Components\Toggle::make('is_published')
                    ->label('منشور؟')
                    ->default(true),
                Forms\Components\TextInput::make('sort')
                    ->label('الترتيب')
                    ->numeric()
                    ->default(0),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('label')
                    ->label('التسمية')
                    ->searchable(),
                Tables\Columns\TextColumn::make('value')
                    ->label('القيمة'),
                Tables\Columns\TextColumn::make('suffix')
                    ->label('اللاحقة'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('منشور؟')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort')
                    ->label('الترتيب')
                    ->sortable(),
            ])
            ->defaultSort('sort')
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStats::route('/'),
            'create' => Pages\CreateStat::route('/create'),
            'edit' => Pages\EditStat::route('/{record}/edit'),
        ];
    }
}
