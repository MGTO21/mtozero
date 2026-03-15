<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Filament\Resources\ServiceResource\RelationManagers;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\Concerns\Translatable;

class ServiceResource extends Resource
{
    use Translatable;
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-cpu-chip';
    protected static ?string $navigationGroup = 'المحتوى';

    // Arabic Plural & Singular Labels
    protected static ?string $navigationLabel = 'الخدمات';
    protected static ?string $modelLabel = 'خدمة';
    protected static ?string $pluralModelLabel = 'الخدمات';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('البيانات الأساسية')
                    ->schema([
                        Forms\Components\Textarea::make('title')
                            ->label('عنوان الخدمة')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description')
                            ->label('وصف الخدمة القصيرة')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('icon')
                            ->label('الأيقونة (Lucide Icon Name)')
                            ->placeholder('e.g. code, cloud, layers'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('مفعلة؟')
                            ->required()
                            ->default(true),
                    ])->columns(2),

                Forms\Components\Section::make('التفاصيل المتقدمة')
                    ->schema([
                        Forms\Components\RichEditor::make('content')
                            ->label('محتوى الخدمة التفصيلي')
                            ->columnSpanFull(),
                        Forms\Components\Repeater::make('features')
                            ->label('مميزات الخدمة')
                            ->schema([
                                Forms\Components\TextInput::make('item')
                                    ->label('الميزة')
                                    ->required()
                            ])
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('الخدمة')
                    ->searchable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('icon')
                    ->label('الأيقونة')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('الحالة')
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
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
