# Настройка контактной формы с Netlify Functions

Этот документ описывает, как настроить бесплатную отправку email для контактной формы.

## 📋 Что было сделано

1. ✅ Создана Netlify Function в `netlify/functions/contact.ts`
2. ✅ Обновлен `ContactForm.tsx` для работы с функцией
3. ✅ Настроен роутинг в `netlify.toml`
4. ✅ Добавлены типы для TypeScript

## 🚀 Быстрый старт

### Шаг 1: Установка зависимостей

```bash
npm install
```

Это установит `@netlify/functions` и другие необходимые пакеты.

### Шаг 2: Настройка Email (выберите один вариант)

#### Вариант A: Gmail SMTP (Рекомендуется для начала)

**Бесплатно:** 500 emails/день

1. Включите 2-Step Verification в вашем Google аккаунте:
   https://myaccount.google.com/security

2. Создайте App Password:
   - Перейдите: https://myaccount.google.com/apppasswords
   - Выберите "Mail" → "Other (Custom name)"
   - Назовите: "DSC Website"
   - Скопируйте 16-значный пароль

3. Добавьте переменные в Netlify:
   ```bash
   netlify env:set SMTP_HOST smtp.gmail.com
   netlify env:set SMTP_PORT 587
   netlify env:set SMTP_SECURE false
   netlify env:set SMTP_USER your-email@gmail.com
   netlify env:set SMTP_PASS your-app-password-here
   netlify env:set SMTP_FROM your-email@gmail.com
   netlify env:set NOTIFY_EMAIL info@digital-security-center.kz
   ```

#### Вариант B: SendGrid (Для большего контроля)

**Бесплатно:** 100 emails/день

1. Зарегистрируйтесь: https://signup.sendgrid.com/

2. Создайте API Key:
   - Settings → API Keys → Create API Key
   - Full Access или Restricted Access (Mail Send)

3. Верифицируйте sender email:
   - Settings → Sender Authentication
   - Verify Single Sender

4. Добавьте переменные в Netlify:
   ```bash
   netlify env:set SMTP_HOST smtp.sendgrid.net
   netlify env:set SMTP_PORT 587
   netlify env:set SMTP_SECURE false
   netlify env:set SMTP_USER apikey
   netlify env:set SMTP_PASS your-sendgrid-api-key
   netlify env:set SMTP_FROM your-verified-email@yourdomain.com
   netlify env:set NOTIFY_EMAIL info@digital-security-center.kz
   ```

### Шаг 3: Установка nodemailer

Для работы email отправки нужно установить nodemailer:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Шаг 4: Раскомментировать код отправки email

Откройте `netlify/functions/contact.ts` и найдите секцию с комментарием:

```typescript
// TODO: Раскомментируйте после установки nodemailer и настройки SMTP
```

Раскомментируйте блок кода с nodemailer (строки ~60-100).

### Шаг 5: Тестирование локально

```bash
# Установите Netlify CLI если еще не установлен
npm install -g netlify-cli

# Запустите dev сервер
netlify dev
```

Сайт будет доступен на `http://localhost:8888`

Протестируйте форму на странице `/contacts`

### Шаг 6: Deploy на Netlify

```bash
# Commit изменений
git add .
git commit -m "Add Netlify Functions for contact form"
git push

# Deploy через Netlify CLI
netlify deploy --prod
```

Или используйте Netlify UI для автоматического deploy при push в GitHub.

## 🔒 Безопасность

Функция уже включает:

- ✅ Server-side валидация всех полей
- ✅ Rate limiting (5 запросов/минуту на IP)
- ✅ CSRF token проверка
- ✅ Input sanitization
- ✅ CORS настройки

## 📊 Мониторинг

### Просмотр логов функций

```bash
netlify functions:log contact
```

Или в Netlify UI:
- Functions → contact → Logs

### Просмотр количества запросов

Netlify Dashboard → Functions → Usage

## 🐛 Troubleshooting

### Форма не отправляется

1. Проверьте логи функции:
   ```bash
   netlify functions:log contact
   ```

2. Убедитесь, что environment variables установлены в Netlify

3. Проверьте настройки SMTP (особенно App Password для Gmail)

### Email не приходит

1. Проверьте папку Spam

2. Убедитесь, что SMTP_FROM и SMTP_USER совпадают (для Gmail)

3. Проверьте логи на ошибки:
   ```bash
   netlify functions:log contact --follow
   ```

### CORS ошибки

Если видите CORS ошибки в браузере:

1. Убедитесь, что в `netlify/functions/contact.ts` правильно настроены headers

2. Для production обновите `Access-Control-Allow-Origin` на ваш домен:
   ```typescript
   'Access-Control-Allow-Origin': 'https://digital-security-center.kz'
   ```

## 💰 Стоимость

**Netlify Functions:**
- Бесплатно: 125,000 запросов/месяц
- Бесплатно: 100 часов исполнения/месяц

**Gmail SMTP:**
- Бесплатно: 500 emails/день

**SendGrid:**
- Бесплатно: 100 emails/день

Для небольшого корпоративного сайта этого более чем достаточно!

## 📝 Следующие шаги

1. [ ] Настроить email отправку (см. Шаг 2)
2. [ ] Установить nodemailer (см. Шаг 3)
3. [ ] Раскомментировать код email (см. Шаг 4)
4. [ ] Протестировать локально (см. Шаг 5)
5. [ ] Deploy на production (см. Шаг 6)
6. [ ] Настроить мониторинг

## 🔗 Полезные ссылки

- [Netlify Functions документация](https://docs.netlify.com/functions/overview/)
- [Nodemailer документация](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid SMTP](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

