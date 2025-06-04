# 🏠 Галерея бытовой техники

Современный веб-сайт для магазина бытовой техники, разработанный с использованием React и Material-UI. Проект предоставляет удобный интерфейс для просмотра и выбора бытовой техники с расширенными возможностями поиска и фильтрации.

## ✨ Основные возможности

- 🎨 Современный, отзывчивый дизайн с использованием Material-UI
- 🎠 Интерактивная карусель товаров на главной странице
- 🔍 Умный поиск товаров с автодополнением
- 📱 Полностью адаптивный дизайн для всех устройств
- 🖼️ Детальные страницы товаров с видео и галереей изображений
- ⭐ Система избранных товаров
- 🔐 Безопасная авторизация пользователей
- 📱 Оптимизированная производительность

## 🛠 Технологический стек

- **Frontend Framework:** React 18
- **UI Library:** Material-UI (MUI)
- **Routing:** React Router v6
- **Carousel:** React Slick
- **Backend & Auth:** Firebase
- **State Management:** React Context API
- **Styling:** CSS-in-JS (styled-components)
- **Build Tool:** Create React App

## 🚀 Установка и запуск

1. **Клонирование репозитория:**
   ```bash
   git clone [URL репозитория]
   ```

2. **Переход в директорию проекта:**
   ```bash
   cd gallery-home-appliances
   ```

3. **Установка зависимостей:**
   ```bash
   npm install
   ```

4. **Запуск проекта:**
   ```bash
   npm start
   ```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
src/
  ├── components/          # Переиспользуемые компоненты
  │   ├── common/         # Общие компоненты
  │   ├── layout/         # Компоненты макета
  │   └── product/        # Компоненты для работы с товарами
  ├── pages/              # Страницы приложения
  ├── hooks/              # Пользовательские хуки
  ├── context/            # React контексты
  ├── services/           # Сервисы и API
  ├── utils/              # Вспомогательные функции
  ├── assets/             # Статические ресурсы
  ├── styles/             # Глобальные стили
  ├── App.js              # Главный компонент
  └── index.js            # Точка входа
```

## 💻 Разработка

### Системные требования

- Node.js 14+
- npm 6+
- Git

### Доступные команды

- `npm start` - Запуск в режиме разработки
- `npm test` - Запуск тестов
- `npm run build` - Сборка для продакшена
- `npm run lint` - Проверка кода линтером
- `npm run format` - Форматирование кода

## 🔧 Конфигурация

Для настройки проекта необходимо создать файл `.env` в корневой директории и указать следующие переменные окружения:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функциональности (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📝 Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)

## 📞 Контакты

По всем вопросам обращайтесь:
- Email: [your-email@example.com]
- GitHub: [your-github-profile] 