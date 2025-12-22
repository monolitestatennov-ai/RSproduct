# RSpace Services Integration - Руководство для Cursor

## 🚀 Быстрый старт в Cursor

### Открытие проекта

1. Откройте папку проекта: `/home/ubuntu/rspace_services_integration`
2. Установите зависимости: `pnpm install`
3. Запустите dev сервер: `pnpm dev`
4. Откройте в браузере: `http://localhost:3000`

---

## 📂 Структура файлов для быстрого доступа

```
ВАЖНЫЕ ФАЙЛЫ:
├── client/src/pages/
│   ├── Home.tsx              ← Страница "Создание" (выбор сервисов)
│   ├── PropertyCard.tsx       ← Страница "Опубликована" (детали объекта)
│   └── Portfolio.tsx          ← Страница "Портфель" (список объектов)
├── client/src/App.tsx         ← Маршрутизация между страницами
├── client/src/index.css       ← Глобальные стили и дизайн-токены
├── PROJECT_ARCHITECTURE.md    ← Архитектура проекта
├── DESIGN_GUIDE.md           ← Руководство по дизайну
└── CURSOR_GUIDE.md           ← Этот файл
```

---

## 🎯 Основные компоненты и их функции

### Home.tsx - Выбор сервисов

**Что здесь:**
- Список 5 основных сервисов + страховка
- Боковая панель с расчётом маржи
- Выбор способа оплаты

**Как добавить новый сервис:**
```typescript
// В массиве allServices добавьте:
{
  id: 'new-service',
  name: 'Название сервиса',
  description: 'Описание',
  price: 10000,
  margin: 5000,
  bonus: 500,
  color: 'blue',
  bgGradient: 'from-blue-400 to-blue-500',
  illustration: '📋',
  recommended: false,
  details: [
    { title: 'Преимущество 1', description: 'Описание' },
    // ...
  ]
}
```

**Как изменить цены:**
- Найдите `price:` и `margin:` в объекте сервиса
- Обновите значения
- Расчёты обновятся автоматически

---

### PropertyCard.tsx - Детали объекта

**Что здесь:**
- Информация об объекте (адрес, цена, ипотека)
- Сервисы с УТП (Уникальное Торговое Предложение)
- **Расчёт пассивного дохода от страховки**

**Как изменить данные объекта:**
```typescript
// Найдите объект property:
const property = {
  address: 'Тюмень, ул. Алматинская, д. 12',
  rooms: 1,
  area: 41,
  floor: '8/16',
  price: 5800000,  // ← Измените цену здесь
  pricePerM2: 141463,
  monthlyPayment: 48074,
  images: 16,
  views: 234,
  calls: 12,
};
```

**Как изменить расчёт страховки:**
```typescript
// Найдите расчёт в разделе "Income Scenarios":
const insurancePerYear = Math.round(property.price * 0.01); // 1% - измените коэффициент
const incomePerYear = Math.round(insurancePerYear * 0.3);   // 30% маржа - измените коэффициент
```

**Как добавить новый сервис:**
```typescript
// В массиве services добавьте:
{
  id: 'new-service',
  name: 'Название',
  price: 10000,
  margin: 5000,
  bonus: 500,
  icon: Shield, // Импортируйте иконку из lucide-react
  color: 'blue',
  description: 'Описание',
  shortUtp: 'Короткое УТП',
  fullUtp: [
    { title: 'Преимущество 1', description: 'Описание' },
    // ...
  ]
}
```

---

### Portfolio.tsx - Список объектов

**Что здесь:**
- Сетка из 12 объектов
- Фильтрация и сортировка
- Модальное окно для выбора услуг
- Модальное окно для поделиться

**Как добавить новый объект:**
```typescript
// В массиве allProperties добавьте:
{
  id: 'prop-13',
  address: 'Тюмень, ул. Новая, д. 1',
  price: 6000000,
  area: 50,
  rooms: 2,
  floor: '5/10',
  totalFloors: 10,
  type: 'apartment',
  image: 'https://example.com/image.jpg'
}
```

**Как изменить фильтры:**
```typescript
// Найдите typeLabels:
const typeLabels = {
  all: 'Все объекты',
  apartment: 'Квартиры',
  house: 'Дома',
  studio: 'Студии'
  // Добавьте новый тип здесь
};
```

**Как изменить опции сортировки:**
```typescript
// В select найдите options:
<option value="price-desc">Цена: выше</option>
<option value="price-asc">Цена: ниже</option>
// Добавьте новую опцию и обновите логику в filteredProperties
```

---

## 🎨 Как работать с дизайном

### Изменение цветов сервисов

Все цвета определены в начале компонентов. Найдите `colorClasses`:

```typescript
const colorClasses = {
  blue: 'bg-blue-50 border-blue-200',
  purple: 'bg-purple-50 border-purple-200',
  orange: 'bg-orange-50 border-orange-200',
  green: 'bg-green-50 border-green-200',
  pink: 'bg-pink-50 border-pink-200',
  indigo: 'bg-indigo-50 border-indigo-700',
};
```

Измените цвета здесь, и они обновятся везде.

### Изменение размеров шрифтов

```html
<!-- Текущие размеры -->
<h1 className="text-2xl md:text-4xl">...</h1>  <!-- 24px на мобильной, 36px на десктопе -->
<p className="text-sm md:text-base">...</p>     <!-- 14px на мобильной, 16px на десктопе -->

<!-- Доступные размеры в Tailwind -->
text-xs   = 12px
text-sm   = 14px
text-base = 16px
text-lg   = 18px
text-xl   = 20px
text-2xl  = 24px
text-3xl  = 30px
text-4xl  = 36px
```

### Изменение интервалов

```html
<!-- Padding -->
<div className="p-4">...</div>  <!-- 16px со всех сторон -->
<div className="p-6">...</div>  <!-- 24px со всех сторон -->

<!-- Margin -->
<div className="mb-4">...</div>  <!-- 16px margin-bottom -->
<div className="gap-2">...</div>  <!-- 8px gap между элементами -->
```

---

## 💡 Частые задачи

### Добавить новую страницу

1. Создайте файл `client/src/pages/NewPage.tsx`
2. Добавьте маршрут в `App.tsx`:
```typescript
<Route path="/new-page" component={NewPage} />
```
3. Добавьте кнопку навигации в заголовок

### Изменить расчёты заработка

Все расчёты находятся в функциях внутри компонентов. Найдите:
- `calculateEarnings()` - расчёт маржи
- `calculateInsuranceIncome()` - расчёт страховки
- `calculateMortgage()` - расчёт ипотеки

### Добавить новый способ оплаты

1. Добавьте опцию в `paymentMethods`
2. Обновите логику в кнопке действия
3. Добавьте обработчик события

### Изменить текст или описания

Все текстовые строки находятся в JSX. Просто найдите нужный текст и измените его.

---

## 🔧 Полезные команды

```bash
# Установка зависимостей
pnpm install

# Запуск dev сервера
pnpm dev

# Сборка для production
pnpm build

# Проверка TypeScript
pnpm type-check

# Форматирование кода
pnpm format

# Лinting
pnpm lint
```

---

## 🐛 Отладка

### Проверка консоли браузера
- Откройте DevTools (F12)
- Перейдите на вкладку Console
- Ищите ошибки в красном цвете

### Проверка элементов
- Откройте DevTools (F12)
- Перейдите на вкладку Elements
- Используйте инструмент выбора (Ctrl+Shift+C)
- Проверьте классы и стили

### Проверка сетевых запросов
- Откройте DevTools (F12)
- Перейдите на вкладку Network
- Перезагрузите страницу
- Ищите ошибки 404 или 500

---

## 📚 Импортируемые компоненты

### shadcn/ui компоненты
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
```

### Иконки (lucide-react)
```typescript
import { Heart, MapPin, Phone, X, Zap, Shield, DollarSign } from 'lucide-react';
```

### Маршрутизация (wouter)
```typescript
import { useLocation } from 'wouter';
const [location, navigate] = useLocation();
```

---

## 🎯 Типичные изменения

### Изменить цену сервиса
```typescript
// Найдите в Home.tsx или PropertyCard.tsx:
{ id: 'service-id', name: '...', price: 5000, ... }
//                                         ↑
//                                    Измените здесь
```

### Добавить новый сервис
```typescript
// Добавьте объект в массив allServices/services:
{
  id: 'unique-id',
  name: 'Название',
  price: 10000,
  margin: 5000,
  // ... остальные поля
}
```

### Изменить расчёт маржи
```typescript
// Найдите в Home.tsx:
const totalMargin = selectedServices.reduce((sum, id) => {
  const service = allServices.find(s => s.id === id);
  return sum + (service?.margin || 0);
}, 0);
// Измените логику здесь
```

### Изменить цвет кнопки
```html
<!-- Было -->
<Button className="bg-blue-600 hover:bg-blue-700">

<!-- Стало -->
<Button className="bg-green-600 hover:bg-green-700">
```

---

## 🚨 Важные замечания

1. **Не редактируйте node_modules** - это автоматически генерируемые файлы
2. **Сохраняйте структуру папок** - компоненты импортируют друг друга по путям
3. **Используйте Tailwind классы** - не пишите custom CSS без необходимости
4. **Проверяйте типы** - используйте TypeScript для предотвращения ошибок
5. **Тестируйте на мобильных** - используйте `md:` префиксы для адаптивности

---

## 📞 Контакты и ресурсы

- **Tailwind CSS документация:** https://tailwindcss.com/docs
- **shadcn/ui компоненты:** https://ui.shadcn.com/
- **lucide-react иконки:** https://lucide.dev/
- **React документация:** https://react.dev/
- **TypeScript документация:** https://www.typescriptlang.org/docs/

---

## ✅ Чек-лист перед коммитом

- [ ] Код скомпилируется без ошибок
- [ ] Нет console.log() в production коде
- [ ] Все новые элементы адаптивны
- [ ] Текст имеет правильный контраст
- [ ] Иконки имеют правильный размер
- [ ] Используются правильные цвета из палитры
- [ ] TypeScript типы правильные
- [ ] Протестировано на мобильных устройствах

