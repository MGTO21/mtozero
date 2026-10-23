<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\Faq;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Concerns\Translatable;

class FaqResource extends Resource
{
    use Translatable;

    protected static ?string $model = Faq::class;

    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle';
    protected static ?string $navigationGroup = 'المحتوى';

    protected static ?string $navigationLabel = 'الأسئلة الشائعة';
    protected static ?string $modelLabel = 'سؤال شائع';
    protected static ?string $pluralModelLabel = 'الأسئلة الشائعة';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Textarea::make('question')
                    ->label('السؤال')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('answer')
                    ->label('الإجابة')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_published')
                    ->label('منشور؟')
                    ->default(true),
                Forms\Components\TextInput::make('sort')
                    ->label('الترتيب')
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('question')
                    ->label('السؤال')
                    ->searchable()
                    ->limit(60),
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
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}
