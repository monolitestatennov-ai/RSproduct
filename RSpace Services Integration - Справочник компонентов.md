# RSpace Services Integration - Справочник компонентов

## 📦 shadcn/ui компоненты

### Button
**Файл:** `client/src/components/ui/button.tsx`

**Использование:**
```typescript
import { Button } from '@/components/ui/button';

// Default
<Button>Выбрать</Button>

// Outline
<Button variant="outline">Отмена</Button>

// Ghost
<Button variant="ghost">Подробнее</Button>

// Размеры
<Button size="sm">Маленькая</Button>
<Button size="default">Обычная</Button>
<Button size="lg">Большая</Button>

// Состояния
<Button disabled>Отключена</Button>
<Button className="bg-blue-600">Синяя</Button>
```

**Где используется:**
- Home.tsx - кнопки выбора сервисов
- PropertyCard.tsx - кнопки действий
- Portfolio.tsx - кнопки в карточках и модальных окнах

---

### Card
**Файл:** `client/src/components/ui/card.tsx`

**Использование:**
```typescript
import { Card } from '@/components/ui/card';

<Card className="p-4 md:p-6">
  <h3>Название</h3>
  <p>Содержимое</p>
</Card>

// С цветом
<Card className="bg-blue-50 border-blue-200">
  {/* Содержимое */}
</Card>
```

**Где используется:**
- Home.tsx - карточки сервисов
- PropertyCard.tsx - карточка объекта и сервисов
- Portfolio.tsx - карточки объектов в сетке

---

### Badge
**Файл:** `client/src/components/ui/badge.tsx`

**Использование:**
```typescript
import { Badge } from '@/components/ui/badge';

<Badge>Квартира</Badge>
<Badge className="bg-slate-100">Дом</Badge>
<Badge variant="secondary">Студия</Badge>
```

**Где используется:**
- Portfolio.tsx - тип объекта в карточке

---

## 🎨 Иконки (lucide-react)

**Импорт:**
```typescript
import { 
  Heart, MapPin, Phone, X, Zap, Shield, DollarSign,
  TrendingUp, FileText, MessageSquare, CheckCircle,
  ArrowRight, AlertCircle, Download, Lock, ChevronDown,
  Share2, Mail, MessageCircle, Copy, Check, Palette
} from 'lucide-react';
```

### Используемые иконки

| Иконка | Использование | Размер |
|--------|---------------|--------|
| Heart | Избранное | w-5 h-5 |
| MapPin | Адрес | w-4 h-4 |
| Phone | Телефон | w-5 h-5 |
| X | Закрыть | w-5 h-5 |
| Zap | Пассивный доход | w-5 h-5 |
| Shield | Проверка | w-5 h-5 |
| DollarSign | Цена | w-5 h-5 |
| TrendingUp | Ипотека | w-5 h-5 |
| FileText | Документы | w-5 h-5 |
| MessageSquare | SMS | w-5 h-5 |
| CheckCircle | Готово | w-5 h-5 |
| ArrowRight | Стрелка | w-4 h-4 |
| AlertCircle | Предупреждение | w-5 h-5 |
| Download | Скачать | w-5 h-5 |
| Lock | Безопасность | w-5 h-5 |
| ChevronDown | Развернуть | w-5 h-5 |
| Share2 | Поделиться | w-5 h-5 |
| Mail | Email | w-5 h-5 |
| MessageCircle | Telegram | w-5 h-5 |
| Copy | Копировать | w-5 h-5 |
| Check | Галочка | w-5 h-5 |
| Palette | Фильтры | w-5 h-5 |

---

## 🗺️ Map компонент

**Файл:** `client/src/components/Map.tsx`

**Использование:**
```typescript
import MapView from '@/components/Map';

<MapView 
  onMapReady={(map) => {
    // Инициализация Google Maps сервисов
  }}
/>
```

**Возможности:**
- Google Maps интеграция
- Places API
- Geocoding
- Directions
- Drawing tools
- Street View

**Статус:** Не используется в текущих страницах

---

## 🔄 Маршрутизация (wouter)

**Импорт:**
```typescript
import { useLocation } from 'wouter';

const [location, navigate] = useLocation();

// Переход на страницу
navigate('/');
navigate('/property');
navigate('/portfolio');

// Получение текущего пути
console.log(location); // '/', '/property', '/portfolio'
```

**Используется в:**
- App.tsx - определение маршрутов
- Home.tsx - навигация между страницами
- PropertyCard.tsx - навигация между страницами
- Portfolio.tsx - навигация между страницами

---

## 📱 Пользовательские компоненты

### Боковая панель (Sidebar) - Home.tsx

**Функциональность:**
- Отображение выбранных сервисов
- Расчёт итоговой суммы и маржи
- Выбор способа оплаты
- Кнопка действия (Выставить счет / Оплатить картой)

**Состояние:**
```typescript
const [selectedServices, setSelectedServices] = useState<string[]>([]);
const [paymentMethod, setPaymentMethod] = useState<'invoice' | 'card'>('invoice');
```

---

### Модальное окно сервисов - Portfolio.tsx

**Функциональность:**
- Отображение 6 сервисов для выбранного объекта
- Выбор сервисов для объекта
- Расчёт потенциального заработка на объект
- Закрытие модального окна

**Состояние:**
```typescript
const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
const [propertyServices, setPropertyServices] = useState<string[]>([]);
```

---

### Модальное окно поделиться - Portfolio.tsx

**Функциональность:**
- Копирование ссылки
- Поделиться в WhatsApp
- Поделиться в Telegram
- Поделиться по Email
- Уведомление о успешном копировании

**Состояние:**
```typescript
const [shareModalOpen, setShareModalOpen] = useState(false);
const [shareProperty, setShareProperty] = useState<Property | null>(null);
const [copySuccess, setCopySuccess] = useState(false);
```

---

## 🎯 Компоненты по страницам

### Home.tsx

```
├── Header
│   ├── Logo
│   ├── Navigation (Создание, Опубликована, Портфель)
│   └── Mobile Menu Toggle
├── Main Content
│   ├── Service Cards Grid
│   │   ├── Service Card (x5)
│   │   │   ├── Icon/Illustration
│   │   │   ├── Name
│   │   │   ├── Description
│   │   │   ├── Price
│   │   │   ├── Margin
│   │   │   ├── Bonus
│   │   │   └── Select Button
│   │   └── Insurance Card
│   │       ├── Icon
│   │       ├── Name
│   │       ├── Description
│   │       ├── Price
│   │       └── Select Button
│   └── Expandable Service Details
│       ├── Full UTP
│       ├── Features
│       └── Close Button
└── Sidebar (Mobile: Bottom Sheet)
    ├── Selected Services List
    ├── Total Price
    ├── Total Margin
    ├── Payment Method Selection
    │   ├── Invoice Option
    │   └── Card Option
    └── Action Button
```

---

### PropertyCard.tsx

```
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Back Button
├── Property Card
│   ├── Image/Icon
│   ├── Address
│   ├── Price
│   ├── Mortgage Payment
│   ├── Status Badge
│   ├── Statistics
│   │   ├── Calls
│   │   ├── Views
│   │   └── Interest Level
│   └── Available Services
│       ├── Service Card (x5)
│       │   ├── Icon
│       │   ├── Name
│       │   ├── Short UTP
│       │   ├── Price
│       │   ├── Margin
│       │   └── Select Button
│       └── Expandable Details
├── Insurance Section
│   ├── Title
│   ├── Description
│   ├── Insurance Cost
│   │   ├── Monthly
│   │   └── Yearly
│   ├── Income Scenarios
│   │   ├── First Year (10, 50, 100 clients)
│   │   └── 12 Years Potential (10, 50, 100 clients)
│   └── Description
├── Mortgage Calculator
│   ├── Current Rate
│   ├── Rate Slider
│   ├── Monthly Payment
│   ├── Recommended Banks
│   └── Mortgage PRO Tip
└── Certificate Section
    ├── Title
    ├── Insurance Info
    ├── Return Amount
    ├── Validity Period
    └── View Certificate Button
```

---

### Portfolio.tsx

```
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Back Button
├── Earnings Banner
│   ├── Total Potential Earnings
│   └── Breakdown by Services
├── Filters & Sorting
│   ├── Type Filter
│   │   ├── All
│   │   ├── Apartments
│   │   ├── Houses
│   │   └── Studios
│   └── Sort Options
│       ├── Price: Higher
│       ├── Price: Lower
│       ├── Area: Larger
│       └── Area: Smaller
├── Properties Grid
│   ├── Property Card (x12)
│   │   ├── Image/Icon
│   │   ├── Address
│   │   ├── Price
│   │   ├── Area
│   │   ├── Rooms
│   │   ├── Floor
│   │   ├── Type Badge
│   │   ├── Favorite Button
│   │   └── Action Buttons
│   │       ├── Services Button
│   │       ├── Share Button
│   │       └── Call Button
│   └── Empty State (if no results)
├── Services Modal (when Services button clicked)
│   ├── Property Info
│   ├── Services Grid
│   │   ├── Service Card (x6)
│   │   │   ├── Illustration
│   │   │   ├── Name
│   │   │   ├── Description
│   │   │   ├── Price
│   │   │   ├── Margin
│   │   │   └── Select/Deselect Button
│   │   └── Earnings Banner
│   └── Close Button
└── Share Modal (when Share button clicked)
    ├── Property Info
    ├── Share Options
    │   ├── Copy Link
    │   ├── WhatsApp
    │   ├── Telegram
    │   └── Email
    ├── Success Message (if copied)
    └── Close Button
```

---

## 🔌 Зависимости

### Production Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "wouter": "^3.2.1",
  "lucide-react": "^0.408.0",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.2",
  "@radix-ui/react-slot": "^2.1.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "typescript": "^5.6.3",
  "vite": "^5.4.11",
  "tailwindcss": "^4.0.0",
  "postcss": "^8.4.49",
  "autoprefixer": "^10.4.20"
}
```

---

## 🎨 Tailwind CSS классы

### Часто используемые классы

```html
<!-- Spacing -->
p-4 p-6 m-4 mb-4 gap-2 gap-4

<!-- Colors -->
bg-blue-50 bg-blue-600 text-slate-900 text-slate-600

<!-- Sizing -->
w-full w-1/2 h-10 h-12

<!-- Layout -->
flex grid grid-cols-1 grid-cols-2 grid-cols-3

<!-- Responsive -->
md:text-2xl md:p-6 lg:grid-cols-3

<!-- Effects -->
rounded-lg shadow-md hover:shadow-lg transition-shadow

<!-- Borders -->
border border-slate-200 border-2 border-blue-500

<!-- Typography -->
font-bold font-semibold text-sm text-base text-lg

<!-- Display -->
hidden md:block flex items-center justify-between
```

---

## 🚀 Как добавить новый компонент

### 1. Создать файл компонента
```typescript
// client/src/components/MyComponent.tsx
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">{title}</h3>
      {onClick && <button onClick={onClick}>Click</button>}
    </div>
  );
};

export default MyComponent;
```

### 2. Импортировать в странице
```typescript
import MyComponent from '@/components/MyComponent';

// Использование
<MyComponent title="Hello" onClick={() => console.log('clicked')} />
```

### 3. Добавить в App.tsx если это страница
```typescript
import MyPage from '@/pages/MyPage';

<Route path="/my-page" component={MyPage} />
```

---

## 📋 Чек-лист компонентов

- [ ] Компонент имеет правильные типы TypeScript
- [ ] Используются правильные иконки из lucide-react
- [ ] Компонент адаптивен (md: префиксы)
- [ ] Используются правильные цвета из палитры
- [ ] Компонент экспортируется правильно
- [ ] Компонент импортируется в нужных местах
- [ ] Нет console.log() в production коде
- [ ] Компонент протестирован на мобильных

