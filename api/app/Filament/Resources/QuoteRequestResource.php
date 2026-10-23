<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuoteRequestResource\Pages;
use App\Models\QuoteRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class QuoteRequestResource extends Resource
{
    protected static ?string $model = QuoteRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-currency-dollar';
    protected static ?string $navigationGroup = 'النظام';

    protected static ?string $navigationLabel = 'طلبات عروض الأسعار';
    protected static ?string $modelLabel = 'طلب عرض سعر';
    protected static ?string $pluralModelLabel = 'طلبات عروض الأسعار';

    // Disabling creation since quote requests only arrive from the frontend
    public static function canCreate(): bool
    {
        return false;
    }

    // Badge: number of requests still marked "new"
    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', 'new')->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('الاسم')
                    ->required(),
                Forms\Components\TextInput::make('email')
                    ->label('البريد الإلكتروني')
                    ->email()
                    ->required(),
                Forms\Components\TextInput::make('phone')
                    ->label('رقم الهاتف'),
                Forms\Components\TextInput::make('project_type')
                    ->label('نوع المشروع')
                    ->required(),
                Forms\Components\TextInput::make('budget')
                    ->label('الميزانية'),
                Forms\Components\TextInput::make('timeline')
                    ->label('المدة الزمنية'),
                Forms\Components\Textarea::make('details')
                    ->label('تفاصيل المشروع')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Select::make('status')
                    ->label('الحالة')
                    ->options([
                        'new' => 'جديد',
                        'reviewed' => 'تمت المراجعة',
                        'quoted' => 'تم إرسال عرض السعر',
                        'closed' => 'مغلق',
                    ])
                    ->required(),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('الاسم')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('البريد الإلكتروني')
                    ->searchable(),
                Tables\Columns\TextColumn::make('project_type')
                    ->label('نوع المشروع'),
                Tables\Columns\TextColumn::make('budget')
                    ->label('الميزانية'),
                Tables\Columns\TextColumn::make('status')
                    ->label('الحالة')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'reviewed' => 'info',
                        'quoted' => 'success',
                        'closed' => 'gray',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإرسال')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListQuoteRequests::route('/'),
            'edit' => Pages\EditQuoteRequest::route('/{record}/edit'),
        ];
    }
}
