# RSpace Services Integration - Архитектура проекта

## 📋 Обзор проекта

**Название:** RSpace Services Integration Prototype  
**Тип:** React 19 + Tailwind 4 (Static Frontend)  
**Назначение:** Платформа для риэлторов по интеграции цифровых сервисов и расчёту потенциального заработка

---

## 🏗️ Структура проекта

```
client/
├── public/
│   ├── images/          # Статические изображения объектов
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Страница "Создание" - выбор сервисов и расчёт
│   │   ├── PropertyCard.tsx    # Страница "Опубликована" - детали объекта
│   │   └── Portfolio.tsx       # Страница "Портфель" - список всех объектов
│   ├── components/
│   │   ├── ui/                # shadcn/ui компоненты (Button, Card, Badge)
│   │   └── Map.tsx            # Google Maps интеграция
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx                # Главный компонент с маршрутизацией
│   ├── main.tsx               # React entry point
│   └── index.css              # Глобальные стили и дизайн-токены
├── package.json
└── tsconfig.json

server/                   # Placeholder (не используется)
shared/                   # Placeholder (не используется)
```

---

## 🎨 Дизайн-система

### Цветовая палитра

| Сервис | Цвет | Градиент | Использование |
|--------|------|----------|--------------|
| Проверка собственника | Blue | from-cyan-400 to-blue-500 | Основной сервис |
| Ипотека PRO | Purple | from-purple-400 to-purple-500 | Дополнительная маржа |
| AI-юрист | Orange | from-orange-400 to-orange-500 | Быстрые договоры |
| SMS-подпись | Green | from-green-400 to-emerald-500 | Снижение риска |
| Сопровождение сделки | Pink | from-pink-400 to-rose-500 | Максимальная маржа |
| Страховка ипотеки | Indigo | from-indigo-600 to-purple-600 | Пассивный доход |

### Типография

- **Display:** Inter Bold (заголовки h1, h2)
- **Body:** Inter Regular (основной текст)
- **Small:** Inter Regular (подписи, описания)

### Компоненты

- **Button:** shadcn/ui с вариантами (default, outline, ghost)
- **Card:** Контейнер с border-radius и тенью
- **Badge:** Для типов объектов (Квартира, Дом, Студия)
- **Modal/Dialog:** Для выбора услуг и поделиться

---

## 📱 Страницы и функциональность

### 1. Home.tsx - "Создание" (Выбор сервисов)

**Функциональность:**
- Выбор сервисов из 5 основных + 1 страховка
- Расчёт маржи и бонусов в реальном времени
- Выбор способа оплаты (Выставить счет / Оплатить картой)
- Боковая панель с итоговой суммой и маржой
- Рекомендуемые сервисы выделены жёлтым кольцом
- Ссылка "Узнать как это работает" на https://rspacelegal-jgdjfkbw.manus.space/

**Ключевые переменные:**
```typescript
const allServices = [
  { id: 'owner-check', name: 'Проверка собственника', price: 5000, margin: 0, ... },
  { id: 'mortgage-pro', name: 'Ипотека PRO', price: 50000, margin: 25000, ... },
  // ... остальные сервисы
];

const selectedServices: string[] = [];
const totalPrice = selectedServices.reduce((sum, id) => sum + service.price, 0);
const totalMargin = selectedServices.reduce((sum, id) => sum + service.margin, 0);
```

---

### 2. PropertyCard.tsx - "Опубликована" (Детали объекта)

**Функциональность:**
- Информация об объекте (адрес, цена, ипотека, комнаты, площадь)
- Статистика (звонки, просмотры, интерес)
- Доступные сервисы с УТП (Уникальное Торговое Предложение)
- **Пассивный доход от страховки:**
  - Расчёт: 1% от цены квартиры в год
  - Доход в первый год: 30% от страховки
  - Потенциал за 12 лет (срок ипотеки)
- Калькулятор ипотечной ставки (13.99% по умолчанию)
- Рекомендуемые банки

**Пример расчёта (квартира 5.8M ₽):**
```
Страховка в год = 5.8M × 0.01 = 58K ₽
Доход в год = 58K × 0.3 = 17.4K ₽
Доход за 12 лет = 17.4K × 12 = 208.8K ₽

Для 10 клиентов: 17.4K × 10 = 174K ₽/год
Для 50 клиентов: 17.4K × 50 = 870K ₽/год
Для 100 клиентов: 17.4K × 100 = 1740K ₽/год
```

---

### 3. Portfolio.tsx - "Портфель" (Список объектов)

**Функциональность:**
- Сетка из 12 объектов недвижимости
- Фильтрация по типу (Все, Квартиры, Дома, Студии)
- Сортировка (Цена выше/ниже, Площадь больше/меньше)
- Баннер с потенциальным заработком на все объекты
- Кнопки в каждой карточке:
  - **Услуги** - открывает модальное окно с выбором сервисов для этого объекта
  - **Поделиться** - открывает модальное окно с опциями:
    - Копировать ссылку
    - WhatsApp
    - Email
    - Telegram
  - **Звонок** - placeholder

**Данные объектов:**
```typescript
interface Property {
  id: string;
  address: string;
  price: number;
  area: number;
  rooms: number;
  floor: string;
  totalFloors: number;
  type: 'apartment' | 'house' | 'studio';
  image: string;
}

// 12 объектов с ценами от 4.2M до 12.5M ₽
```

---

## 🔄 Маршрутизация

```typescript
// App.tsx
<Router>
  <Route path="/" component={Home} />           // Создание
  <Route path="/property" component={PropertyCard} /> // Опубликована
  <Route path="/portfolio" component={Portfolio} />   // Портфель
</Router>
```

---

## 💾 Состояние (State)

### Home.tsx
- `selectedServices: string[]` - выбранные сервисы
- `paymentMethod: 'invoice' | 'card'` - способ оплаты
- `showSidebar: boolean` - видимость боковой панели (мобильная)

### PropertyCard.tsx
- `mortgageRate: number` - текущая ставка ипотеки
- `expandedService: string | null` - развёрнутый сервис

### Portfolio.tsx
- `selectedType: 'all' | 'apartment' | 'house' | 'studio'` - фильтр
- `sortBy: 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'` - сортировка
- `favorites: string[]` - избранные объекты
- `selectedProperty: Property | null` - выбранный объект для услуг
- `propertyServices: string[]` - услуги для выбранного объекта
- `shareModalOpen: boolean` - видимость модального окна поделиться
- `shareProperty: Property | null` - объект для поделиться
- `copySuccess: boolean` - флаг успешного копирования

---

## 🎯 Ключевые функции

### Расчёт маржи и бонусов
```typescript
const calculateEarnings = (serviceIds: string[]) => {
  let totalPrice = 0;
  let totalMargin = 0;
  let totalBonus = 0;
  
  serviceIds.forEach(id => {
    const service = allServices.find(s => s.id === id);
    if (service) {
      totalPrice += service.price;
      totalMargin += service.margin;
      totalBonus += service.bonus;
    }
  });
  
  return { totalPrice, totalMargin, totalBonus };
};
```

### Расчёт пассивного дохода от страховки
```typescript
const calculateInsuranceIncome = (propertyPrice: number, clientCount: number) => {
  const insurancePerYear = propertyPrice * 0.01; // 1% от цены
  const incomePerYear = insurancePerYear * 0.3;  // 30% маржа
  const incomePerClient = incomePerYear * clientCount;
  const potential12Years = incomePerClient * 12;
  
  return { insurancePerYear, incomePerYear, incomePerClient, potential12Years };
};
```

---

## 🔗 Интеграции

### Google Maps
- Компонент: `client/src/components/Map.tsx`
- Функциональность: Отображение объектов на карте (не используется в текущих страницах)
- Аутентификация: Через Manus proxy (автоматическая)

### Внешние ссылки
- **Узнать как это работает:** https://rspacelegal-jgdjfkbw.manus.space/
- **WhatsApp Share:** https://wa.me/?text=...
- **Telegram Share:** https://t.me/share/url?...
- **Email Share:** mailto:?subject=...&body=...

---

## 📊 Данные для тестирования

### Объекты недвижимости (Portfolio)
```
1. ул. Воронинская, д. 47 - 12.5M ₽ (2 комн., 64.7 м², 7/9)
2. пр. Мира, д. 5 - 12.5M ₽ (2 комн., 64.8 м², 6/9)
3. ул. Кунцевская, д. 13 - 11.2M ₽ (1 комн., 58.4 м², 4/12)
... (всего 12 объектов)
```

### Сервисы
```
1. Проверка собственника - 5K ₽, маржа 0, бонус 250
2. Ипотека PRO - 50K ₽, маржа 25K ₽, бонус 2500
3. AI-юрист - 0 ₽ (готово), маржа 0, бонус 0
4. SMS-подпись - 0 ₽ (готово), маржа 0, бонус 0
5. Сопровождение сделки - 90K ₽, маржа 55K ₽, бонус 4500
6. Страховка ипотеки - рассчитывается (1% от цены)
```

---

## 🚀 Следующие шаги для разработки

1. **Backend интеграция**
   - API для сохранения выбранных услуг
   - API для получения реальных данных объектов
   - API для отправки заказов

2. **Аутентификация**
   - Интеграция с Manus OAuth
   - Сохранение профиля риэлтора
   - Персонализация данных

3. **Улучшения UX**
   - Сохранение выбранных услуг в localStorage
   - История действий
   - Уведомления при успешном заказе

4. **Аналитика**
   - Отслеживание конверсии по сервисам
   - Популярность услуг
   - ROI для риэлторов

5. **Экспорт и отчёты**
   - Экспорт в PDF
   - Отчёты по портфелю
   - Прогнозы дохода

---

## 📝 Примечания

- Все расчёты выполняются на клиенте (нет API)
- Данные объектов захардкодены в Portfolio.tsx
- Страховка рассчитывается как 1% от цены квартиры в год
- Маржа от страховки принята как 30% (может быть изменена)
- Потенциал страховки рассчитывается на 12 лет (стандартный срок ипотеки в РФ)

