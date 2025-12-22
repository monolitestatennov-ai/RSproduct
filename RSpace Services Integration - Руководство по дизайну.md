# RSpace Services Integration - Руководство по дизайну

## 🎨 Дизайн-философия

Проект использует **чистый, профессиональный дизайн** с акцентом на **функциональность и ясность**. Каждый элемент служит цели помочь риэлторам быстро принять решение о выборе сервисов.

---

## 🎯 Цветовая схема

### Основные цвета

| Название | HEX | RGB | Использование |
|----------|-----|-----|--------------|
| Blue (Primary) | #2563EB | 37, 99, 235 | Кнопки, ссылки, основные действия |
| Slate (Neutral) | #64748B | 100, 116, 139 | Текст, фоны, границы |
| Green (Success) | #16A34A | 22, 163, 74 | Успех, положительные действия |
| Red (Error) | #DC2626 | 220, 38, 38 | Ошибки, предупреждения |
| Yellow (Warning) | #EAB308 | 234, 179, 8 | Предупреждения, рекомендации |

### Сервисы (Цветные блоки)

| Сервис | Основной цвет | Градиент | Текст |
|--------|---------------|----------|-------|
| Проверка собственника | #0EA5E9 (Cyan) | cyan-400 → blue-500 | Белый |
| Ипотека PRO | #A855F7 (Purple) | purple-400 → purple-500 | Белый |
| AI-юрист | #F97316 (Orange) | orange-400 → orange-500 | Белый |
| SMS-подпись | #22C55E (Green) | green-400 → emerald-500 | Белый |
| Сопровождение сделки | #EC4899 (Pink) | pink-400 → rose-500 | Белый |
| Страховка ипотеки | #4F46E5 (Indigo) | indigo-600 → purple-600 | Белый |

---

## 🔤 Типография

### Шрифты

- **Основной:** Inter (Google Fonts)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Иерархия текста

| Уровень | Размер | Вес | Использование |
|---------|--------|-----|--------------|
| H1 | 32px (md: 48px) | 700 Bold | Заголовки страниц |
| H2 | 24px (md: 32px) | 700 Bold | Заголовки секций |
| H3 | 20px | 600 Semibold | Подзаголовки |
| H4 | 16px | 600 Semibold | Названия карточек |
| Body | 16px | 400 Regular | Основной текст |
| Small | 14px | 400 Regular | Подписи, описания |
| Xs | 12px | 400 Regular | Мелкие подписи |

### Примеры использования

```html
<!-- H1: Заголовок страницы -->
<h1 className="text-2xl md:text-4xl font-bold text-slate-900">RSpace</h1>

<!-- H2: Заголовок секции -->
<h2 className="text-xl md:text-2xl font-bold text-slate-900">Доступные сервисы</h2>

<!-- Body: Основной текст -->
<p className="text-slate-600 text-sm md:text-base">Описание сервиса...</p>

<!-- Small: Подпись -->
<p className="text-xs text-slate-600">Цена</p>
```

---

## 📐 Интервалы и размеры

### Spacing Scale (Tailwind)

```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
6   = 24px
8   = 32px
12  = 48px
16  = 64px
```

### Примеры использования

```html
<!-- Padding -->
<div className="p-4 md:p-6">...</div>

<!-- Margin -->
<div className="mb-4 md:mb-6">...</div>

<!-- Gap между элементами -->
<div className="flex gap-2 md:gap-4">...</div>
```

---

## 🔲 Компоненты

### Button

```typescript
// Primary (Default)
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Выбрать
</Button>

// Secondary (Outline)
<Button variant="outline" className="border border-slate-300">
  Отмена
</Button>

// Ghost
<Button variant="ghost">
  Подробнее
</Button>
```

### Card

```typescript
// Базовая карточка
<Card className="border border-slate-200 p-4 md:p-6">
  <h3>Название</h3>
  <p>Описание</p>
</Card>

// Карточка сервиса с цветом
<Card className="border-2 p-4 bg-blue-50 border-blue-200">
  {/* Содержимое */}
</Card>
```

### Badge

```typescript
<Badge className="bg-slate-100 text-slate-700">
  Квартира
</Badge>
```

### Modal/Dialog

```typescript
// Полноэкранный modal на мобильных, центрированный на десктопе
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
  <Card className="w-full sm:max-w-md rounded-t-2xl sm:rounded-lg">
    {/* Содержимое */}
  </Card>
</div>
```

---

## 📱 Адаптивный дизайн

### Breakpoints

```
sm  = 640px   (планшеты)
md  = 768px   (большие планшеты)
lg  = 1024px  (десктопы)
xl  = 1280px  (большие десктопы)
```

### Примеры адаптивности

```html
<!-- Текст -->
<h1 className="text-2xl md:text-4xl">Заголовок</h1>

<!-- Сетка -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Карточки */}
</div>

<!-- Padding -->
<div className="p-4 md:p-6 lg:p-8">...</div>

<!-- Видимость -->
<div className="hidden md:block">Видно только на md+ экранах</div>
```

---

## ✨ Эффекты и анимации

### Переходы

```css
/* Плавные переходы */
transition-all duration-200 ease-in-out

/* Для hover эффектов */
hover:shadow-lg transition-shadow
hover:bg-blue-700 transition-colors
```

### Примеры

```html
<!-- Hover на карточке -->
<Card className="hover:shadow-lg transition-shadow">...</Card>

<!-- Hover на кнопке -->
<Button className="hover:bg-blue-700 transition-colors">...</Button>

<!-- Hover на цене -->
<p className="text-slate-600 hover:text-slate-900 transition-colors">...</p>
```

---

## 🎭 Состояния элементов

### Button States

```
Default    → bg-blue-600 text-white
Hover      → bg-blue-700
Active     → bg-blue-800
Disabled   → bg-slate-300 cursor-not-allowed
Loading    → opacity-75 pointer-events-none
```

### Card States

```
Default    → border-slate-200 bg-white
Selected   → border-blue-500 bg-blue-50
Hover      → shadow-lg
Error      → border-red-500 bg-red-50
```

---

## 🌈 Цветовые комбинации для сервисов

### Проверка собственника (Blue)
```
Background: from-cyan-400 to-blue-500
Text: white
Border: border-blue-200
Light BG: bg-blue-50
```

### Ипотека PRO (Purple)
```
Background: from-purple-400 to-purple-500
Text: white
Border: border-purple-200
Light BG: bg-purple-50
```

### AI-юрист (Orange)
```
Background: from-orange-400 to-orange-500
Text: white
Border: border-orange-200
Light BG: bg-orange-50
```

### SMS-подпись (Green)
```
Background: from-green-400 to-emerald-500
Text: white
Border: border-green-200
Light BG: bg-green-50
```

### Сопровождение сделки (Pink)
```
Background: from-pink-400 to-rose-500
Text: white
Border: border-pink-200
Light BG: bg-pink-50
```

### Страховка ипотеки (Indigo)
```
Background: from-indigo-600 to-purple-600
Text: white
Border: border-indigo-700
Light BG: bg-indigo-50
```

---

## 📏 Размеры элементов

### Кнопки

```
Small   → h-8 px-3 text-xs
Default → h-10 px-4 text-sm
Large   → h-12 px-6 text-base
```

### Иконки

```
xs  → w-3 h-3
sm  → w-4 h-4
md  → w-5 h-5
lg  → w-6 h-6
xl  → w-8 h-8
```

### Карточки

```
Padding: p-4 (мобильная), p-6 (десктоп)
Border Radius: rounded-lg (8px)
Shadow: shadow-md (при hover)
```

---

## 🎪 Специальные элементы

### Баннер заработка (Yellow)
```html
<div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
  <p className="text-sm text-slate-600">Ваш потенциальный заработок</p>
  <p className="text-2xl font-bold text-slate-900 mt-1">85K ₽</p>
</div>
```

### Рекомендуемый сервис (Yellow Ring)
```html
<div className="ring-2 ring-yellow-400 rounded-lg">
  {/* Сервис */}
</div>
```

### Выбранный сервис (Цветной фон)
```html
<div className="bg-blue-50 border-2 border-blue-200">
  {/* Сервис */}
</div>
```

---

## 📊 Таблицы и сетки

### Сетка карточек

```html
<!-- 1 колонка на мобильной, 2 на планшете, 3 на десктопе -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Карточки */}
</div>
```

### Таблица данных

```html
<div className="space-y-2 text-sm">
  <div className="flex justify-between">
    <span className="text-slate-600">Цена:</span>
    <span className="font-semibold text-slate-900">5.8M ₽</span>
  </div>
</div>
```

---

## 🔗 Ссылки и навигация

### Навигационные кнопки

```html
<div className="flex gap-2">
  <Button variant={isActive ? 'default' : 'outline'}>
    Создание
  </Button>
  <Button variant={isActive ? 'default' : 'outline'}>
    Опубликована
  </Button>
  <Button variant={isActive ? 'default' : 'outline'}>
    Портфель
  </Button>
</div>
```

---

## ✅ Чек-лист при добавлении новых элементов

- [ ] Используется правильный цвет из палитры
- [ ] Текст имеет достаточный контраст (WCAG AA)
- [ ] Элемент адаптивен для мобильных устройств
- [ ] Используются правильные размеры шрифтов и интервалы
- [ ] Добавлены hover/active состояния
- [ ] Иконки имеют правильный размер
- [ ] Используются существующие компоненты (Button, Card, Badge)
- [ ] Код соответствует стилю проекта

