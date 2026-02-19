# 📊 Nuxt Admin Dashboard

Тестовый админ-проект на Nuxt 3/4 с mock API.

В проекте есть:

* Авторизация
* Dashboard аналитики
* Таблицы с пагинацией
* Модалки и UI компоненты
* Mock backend через server/api

---

## 🚀 Установка

npm install

---

## ▶️ Запуск проекта

npm run dev

Открыть в браузере:
http://localhost:3000

---

## 🏗 Сборка production

npm run build
npm run preview

---

## 📁 Структура проекта

app/ – корень приложения
components/ – UI компоненты (DataTable, UiModal и т.д.)
pages/ – страницы
stores/ – Pinia store
composables/ – composables
services/ – axios методы API
server/api/ – mock API

---

## 📦 Mock API

Все мок-данные лежат в папке:

server/api/

Примеры:

* auth/login.post.ts
* imports.get.ts
* imports/[id].get.ts
* analytics.get.ts

Mock API имитирует backend и позволяет запускать проект без реального сервера.

---

## ⚙️ Env переменные

.env файл не требуется для запуска mock версии.

Если подключать реальный API, можно добавить:

API_URL=https://example.com

---

## 🛠 Используемые технологии

Nuxt 3 / Nuxt 4
Vue 3 + Composition API
Pinia
Axios
TailwindCSS
ECharts
Mock API через Nitro server/api

---

## 👤 Автор

Sherik Fayzulin
