<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PortfolioProjectResource\Pages;
use App\Filament\Resources\PortfolioProjectResource\RelationManagers;
use App\Models\PortfolioProject;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\Concerns\Translatable;

class PortfolioProjectResource extends Resource
{
    use Translatable;
    protected static ?string $model = PortfolioProject::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'المحتوى';
    
    // Arabic Plural & Singular Labels
    protected static ?string $navigationLabel = 'معرض الأعمال';
    protected static ?string $modelLabel = 'مشروع محفظة';
    protected static ?string $pluralModelLabel = 'مشاريع محفظة الأعمال';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Textarea::make('title')
                    ->label('عنوان المشروع')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('description')
                    ->label('وصف المشروع')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('image')
                    ->label('صور المشروع (الرجاء رفع عدة صور)')
                    ->multiple()
                    ->image()
                    ->directory('portfolio-images')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('url')
                    ->label('رابط المشروع (URL)'),
                Forms\Components\Toggle::make('is_published')
                    ->label('منشور للعامة؟')
                    ->default(true)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('الصور')
                    ->circular()
                    ->stacked(),
                Tables\Columns\TextColumn::make('title')
                    ->label('عنوان المشروع')
                    ->searchable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('url')
                    ->label('الرابط')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('منشور')
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
            'index' => Pages\ListPortfolioProjects::route('/'),
            'create' => Pages\CreatePortfolioProject::route('/create'),
            'edit' => Pages\EditPortfolioProject::route('/{record}/edit'),
        ];
    }
}
