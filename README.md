# site-marina

## 📌 Описание

**site-marina** — это Vue.js приложение для отображения отзывов клиентов и управления заявками и отзывами через админ-панель.

**Функциональность:**
- Отображение 3 отзывов на клиентской странице.
- Админ-панель с возможностью просматривать, добавлять, редактировать и удалять отзывы и заявки.
- Отзывы загружаются из статического файла `public/data/reviews.json`.
- Заявки управляются через API `/api/requests`.

> ⚠️ Требуется разработка полноценного бэкенда для динамической работы с отзывами.

---

## 🗂️ Структура проекта

| Файл/Папка                         | Назначение |
|-----------------------------------|------------|
| `src/components/FormFour.vue`     | Отображает 3 отзыва. Стили внутри компонента (`<style scoped>`). |
| `src/components/AdminPanel.vue`   | Админ-панель для управления заявками и отзывами. |
| `public/data/reviews.json`        | Статические отзывы в формате `{ id, author, text }`. |
| `package.json`                    | Зависимости и скрипты проекта. |
| `.gitignore`                      | Исключает временные файлы, папки `node_modules/`, `dist/` и прочие. |

---

## 🔧 Текущая функциональность

### 🧾 Страница отзывов (`FormFour.vue`)
- Загружает 3 отзыва из `/data/reviews.json` с помощью `axios`.
- Отображает карточки с иконкой `/images/review-icon.png`, текстом и автором.
- Стили: адаптивный дизайн с использованием шрифта **Nekst**, теней и `flexbox`.

### 🛠️ Админ-панель (`AdminPanel.vue`)
#### Заявки:
- Получение списка заявок с пагинацией (API: `GET /api/requests?page=X`).
- Удаление заявок (`DELETE /api/requests/:id`).

#### Отзывы:
- Чтение, добавление, редактирование и удаление (временно — только в памяти).
- Источник данных — `public/data/reviews.json`.

> ⚠️ Требуется реализация API для сохранения отзывов и авторизация.

---

## 📦 Зависимости

- `vue`: ^3.2.0  
- `axios`: ^1.7.2  
- Dev-зависимости:  
  - `@vue/cli-service`  
  - `gh-pages` (для деплоя)

---

## 🚀 Установка

```bash
git clone https://github.com/your-username/site-marina.git
cd site-marina
npm install
npm run serve


-----------------------------------------------------------------------------------------


Запустите проект в режиме разработки:npm run serve

Компиляция для продакшена
npm run build

Результат сборки будет в папке dist/.
Деплой

Для публикации на GitHub Pages:npm run deploy

Убедитесь, что vue.config.js настроен с правильным publicPath (например, /site-marina/).

Линтинг
npm run lint

Требования к бэкенду
Для полной функциональности требуется REST API для управления отзывами и сохранения текущей работы с заявками. Рекомендуемые технологии: Node.js (Express), база данных (MongoDB или PostgreSQL).
API для отзывов

GET /api/reviews?limit=3:
Возвращает 3 последних отзыва для FormFour.vue.
Формат ответа:[
  { "id": 1, "author": "Анна", "text": "Отличный сервис!" },
  { "id": 2, "author": "Михаил", "text": "Профессионально!" },
  { "id": 3, "author": "Екатерина", "text": "Спасибо за оперативность!" }
]

GET /api/reviews:
Возвращает все отзывы для админ-панели.
Формат: { reviews: [{ id: number, author: string, text: string }], total: number }.

POST /api/reviews:
Добавляет новый отзыв.
Тело запроса: { author: string, text: string }.
Ответ: { id: number, author: string, text: string }.

PUT /api/reviews/:id:
Обновляет отзыв по ID.
Тело запроса: { author: string, text: string }.
Ответ: { id: number, author: string, text: string }.

DELETE /api/reviews/:id:
Удаляет отзыв по ID.
Ответ: { success: true }.

API для заявок (существующая функциональность)

GET /api/requests?page=X:
Возвращает заявки с пагинацией.
Формат: { requests: [{ id: number, name: string, phone: string, email: string, createdAt: string }], totalPages: number }.

DELETE /api/requests/:id:
Удаляет заявку по ID.
Ответ: { success: true }.

Аутентификация

Реализовать защиту админ-панели (например, JWT).
API для логина-kernel: POST /api/login (принимает { username, password }, возвращает токен).
Защищённые эндпоинты: все методы админ-панели.

Хранение данных

Использовать базу данных (MongoDB, PostgreSQL или другую).
Структура для отзывов: { id, author, text }.
Структура для заявок: { id, name, phone, email, createdAt }.

Дополнительно

Поддержка CORS для фронтенда.
Обработка ошибок (400, 401, 404, 500).
Документация API (желательно Swagger/OpenAPI).

Замечания

Текущая реализация отзывов использует статический файл /data/reviews.json. Бэкенд должен заменить его на динамическое API.
Стили в FormFour.vue (шрифт Nekst, тени, flexbox) должны остаться без изменений.
Добавить аутентификацию для админ-панели.
Ссылка на конфигурацию Vue CLI: Configuration Reference.