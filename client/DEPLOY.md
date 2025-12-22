# 🚀 Инструкция по деплою RSpace

## Варианты деплоя

### 1. Vercel (Рекомендуется - самый простой)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в Vercel:
```bash
vercel login
```

3. Деплой:
```bash
cd client
vercel
```

Или через веб-интерфейс:
- Зайдите на [vercel.com](https://vercel.com)
- Подключите ваш GitHub репозиторий
- Vercel автоматически определит настройки для Vite
- Нажмите Deploy

**Преимущества:**
- ✅ Автоматический деплой при push в GitHub
- ✅ Бесплатный SSL
- ✅ Быстрый CDN
- ✅ Автоматические preview для PR

---

### 2. Netlify

1. Установите Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Войдите в Netlify:
```bash
netlify login
```

3. Деплой:
```bash
cd client
netlify deploy --prod
```

Или через веб-интерфейс:
- Зайдите на [netlify.com](https://netlify.com)
- Перетащите папку `client/dist` после сборки
- Или подключите GitHub репозиторий

**Преимущества:**
- ✅ Простой деплой
- ✅ Бесплатный SSL
- ✅ Формы и функции

---

### 3. GitHub Pages

1. Соберите проект:
```bash
cd client
npm install
npm run build
```

2. Настройте `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/', // имя вашего репозитория
  // ... остальные настройки
});
```

3. Используйте GitHub Actions (файл уже создан в `.github/workflows/deploy.yml`)

4. Включите GitHub Pages в настройках репозитория:
   - Settings → Pages
   - Source: GitHub Actions

**Преимущества:**
- ✅ Бесплатно
- ✅ Интеграция с GitHub
- ✅ Автоматический деплой через Actions

---

### 4. Cloudflare Pages

1. Зайдите на [pages.cloudflare.com](https://pages.cloudflare.com)

2. Подключите GitHub репозиторий

3. Настройки:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `client`

**Преимущества:**
- ✅ Очень быстрый CDN
- ✅ Бесплатный SSL
- ✅ Неограниченная пропускная способность

---

## Быстрый старт (Vercel)

```bash
# 1. Установите зависимости
cd client
npm install

# 2. Проверьте сборку локально
npm run build

# 3. Деплой через Vercel CLI
npm i -g vercel
vercel login
vercel

# Или через веб-интерфейс:
# - Зайдите на vercel.com
# - Import Project → выберите GitHub репозиторий
# - Нажмите Deploy
```

---

## Настройка для SPA (Single Page Application)

Все конфигурационные файлы уже созданы:
- ✅ `vercel.json` - для Vercel
- ✅ `netlify.toml` - для Netlify
- ✅ `.github/workflows/deploy.yml` - для GitHub Pages

Они настроены на правильную маршрутизацию для SPA (все маршруты → index.html).

---

## Переменные окружения (если понадобятся)

Если в будущем понадобятся переменные окружения:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Cloudflare Pages: Settings → Environment variables

---

## Проверка после деплоя

После деплоя проверьте:
1. ✅ Главная страница открывается
2. ✅ Навигация между страницами работает
3. ✅ Мобильная версия отображается корректно
4. ✅ Все компоненты загружаются

---

## Проблемы?

Если что-то не работает:
1. Проверьте консоль браузера (F12)
2. Проверьте логи деплоя в панели платформы
3. Убедитесь, что `base` в `vite.config.ts` правильный
4. Проверьте, что все маршруты настроены в `App.tsx`

