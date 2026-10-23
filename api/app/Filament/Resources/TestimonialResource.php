<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Concerns\Translatable;

class TestimonialResource extends Resource
{
    use Translatable;

    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';
    protected static ?string $navigationGroup = 'المحتوى';

    protected static ?string $navigationLabel = 'آراء العملاء';
    protected static ?string $modelLabel = 'رأي عميل';
    protected static ?string $pluralModelLabel = 'آراء العملاء';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('اسم العميل')
                    ->required(),
                Forms\Components\TextInput::make('company')
                    ->label('الشركة'),
                Forms\Components\TextInput::make('role')
                    ->label('المسمى الوظيفي'),
                Forms\Components\Textarea::make('content')
                    ->label('الرأي / الشهادة')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Select::make('rating')
                    ->label('التقييم')
                    ->options(['1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5'])
                    ->default(5)
                    ->required(),
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
                Tables\Columns\TextColumn::make('name')
                    ->label('اسم العميل')
                    ->searchable(),
                Tables\Columns\TextColumn::make('company')
                    ->label('الشركة')
                    ->searchable(),
                Tables\Columns\TextColumn::make('rating')
                    ->label('التقييم')
                    ->sortable(),
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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
