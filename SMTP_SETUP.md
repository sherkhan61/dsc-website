# Настройка Email отправки для контактной формы

Для работы контактной формы необходимо настроить SMTP отправку email. Это руководство покажет как это сделать через Netlify Environment Variables.

## Требуемые переменные окружения

В Netlify Dashboard нужно добавить следующие Environment Variables:

### Обязательные переменные:

1. **SMTP_USER** - Email адрес для отправки (например, `info@digital-security-center.kz`)
2. **SMTP_PASS** - Пароль или App Password для SMTP
3. **NOTIFY_EMAIL** - Email адрес, куда будут приходить заявки

### Опциональные переменные (если используете не Gmail):

4. **SMTP_HOST** - SMTP сервер (по умолчанию: `smtp.gmail.com`)
5. **SMTP_PORT** - Порт SMTP (по умолчанию: `587`)
6. **SMTP_FROM** - Email отправителя (по умолчанию: `info@digital-security-center.kz`)
7. **SMTP_SECURE** - Использовать SSL (по умолчанию: `false`, для порта 465 установите `true`)

---

## Вариант 1: Gmail SMTP (Рекомендуется для тестирования)

### Шаг 1: Создайте App Password

1. Откройте [Google Account Security](https://myaccount.google.com/security)
2. Включите **2-Step Verification** (если еще не включена)
3. Перейдите в **App passwords**: https://myaccount.google.com/apppasswords
4. Создайте новый App Password:
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Введите название: **Netlify Contact Form**
5. Скопируйте сгенерированный пароль (16 символов)

### Шаг 2: Добавьте переменные в Netlify

1. Откройте [Netlify Dashboard](https://app.netlify.com)
2. Выберите ваш сайт
3. Перейдите в **Site settings → Environment variables**
4. Добавьте следующие переменные:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ваш-email@gmail.com
SMTP_PASS=сгенерированный-app-password
SMTP_FROM=ваш-email@gmail.com
NOTIFY_EMAIL=email-куда-приходят-заявки@gmail.com
```

### Ограничения Gmail:

- **500 писем в день** (для бесплатных аккаунтов)
- Может блокироваться при подозрительной активности

---

## Вариант 2: SendGrid (Рекомендуется для продакшена)

SendGrid предоставляет **100 бесплатных писем в день**.

### Шаг 1: Создайте аккаунт SendGrid

1. Зарегистрируйтесь на [SendGrid](https://signup.sendgrid.com/)
2. Подтвердите email
3. Создайте **API Key**:
   - Settings → API Keys → Create API Key
   - Name: `Netlify Contact Form`
   - Permissions: **Full Access** (или только **Mail Send**)
   - Скопируйте API Key (он показывается только один раз!)

### Шаг 2: Верифицируйте домен или email

1. Settings → Sender Authentication
2. Выберите **Single Sender Verification** (проще) или **Domain Authentication** (лучше для продакшена)
3. Подтвердите email отправителя

### Шаг 3: Добавьте переменные в Netlify

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=ваш-sendgrid-api-key
SMTP_FROM=verified-email@yourdomain.com
NOTIFY_EMAIL=email-куда-приходят-заявки@yourdomain.com
```

**ВАЖНО:** `SMTP_USER` всегда должен быть `apikey` (это не опечатка!)

### Преимущества SendGrid:

- Надежная доставка email
- Детальная статистика
- Профессиональный сервис
- Не блокируется как Gmail

---

## Вариант 3: Mailgun (Альтернатива SendGrid)

Mailgun также предоставляет **100 бесплатных писем в день**.

### Шаг 1: Создайте аккаунт Mailgun

1. Зарегистрируйтесь на [Mailgun](https://signup.mailgun.com/new/signup)
2. Подтвердите email и номер телефона
3. Создайте **SMTP credentials**:
   - Sending → Domain settings → SMTP credentials
   - Username: `postmaster@sandbox...mailgun.org` (или ваш домен)
   - Password: сгенерируйте новый

### Шаг 2: Добавьте переменные в Netlify

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@sandbox...mailgun.org
SMTP_PASS=ваш-mailgun-password
SMTP_FROM=noreply@yourdomain.com
NOTIFY_EMAIL=email-куда-приходят-заявки@yourdomain.com
```

---

## Добавление переменных в Netlify Dashboard

### Через веб-интерфейс:

1. Откройте [Netlify Dashboard](https://app.netlify.com)
2. Выберите ваш сайт
3. **Site settings → Environment variables**
4. Нажмите **Add a variable**
5. Для каждой переменной:
   - Key: `SMTP_USER` (например)
   - Value: `ваше-значение`
   - Scopes: отметьте **все** (Production, Deploy Previews, Branch deploys)
6. Нажмите **Save**

### Через Netlify CLI:

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Авторизуйтесь
netlify login

# Добавьте переменные
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_SECURE "false"
netlify env:set SMTP_USER "your-email@gmail.com"
netlify env:set SMTP_PASS "your-app-password"
netlify env:set SMTP_FROM "your-email@gmail.com"
netlify env:set NOTIFY_EMAIL "recipient@example.com"
```

---

## Проверка работы

После добавления переменных:

1. **Redeploy сайт** (или сделайте новый commit)
2. Откройте страницу **Контакты** на вашем сайте
3. Заполните и отправьте тестовую форму
4. Проверьте inbox на `NOTIFY_EMAIL`

### Отладка проблем:

1. Откройте **Netlify Dashboard → Functions → contact**
2. Посмотрите логи последнего вызова
3. Ищите ошибки типа:
   - `Email sending failed` - проверьте SMTP credentials
   - `Authentication failed` - неверный пароль
   - `Connection timeout` - проверьте SMTP_HOST и SMTP_PORT

---

## Безопасность

### ✅ Что уже настроено:

- **Rate limiting** - максимум 5 запросов в минуту с одного IP
- **CSRF защита** - токены безопасности для каждой формы
- **Input validation** - проверка всех полей на корректность
- **Input sanitization** - защита от XSS атак
- **Error handling** - безопасная обработка ошибок без утечки данных

### ⚠️ Рекомендации:

1. **Никогда не коммитьте** SMTP credentials в Git
2. Используйте **сильные пароли** или API keys
3. Регулярно **меняйте API keys** (раз в 3-6 месяцев)
4. Включите **2FA** на всех почтовых аккаунтах
5. Мониторьте **Netlify Function logs** на подозрительную активность

---

## Дополнительные возможности

### Добавление копии письма клиенту:

В файле `netlify/functions/contact.ts` можно добавить отправку подтверждающего письма клиенту:

```typescript
// После успешной отправки на NOTIFY_EMAIL
await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: data.email, // Email клиента
  subject: 'Спасибо за обращение!',
  html: `
    <h2>Здравствуйте, ${data.name}!</h2>
    <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
    <p>Ваше сообщение:</p>
    <blockquote>${data.message}</blockquote>
    <p>С уважением,<br>Центр цифровой безопасности</p>
  `
});
```

### Отправка в Telegram:

Можно также настроить отправку уведомлений в Telegram Bot. Добавьте переменные:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

---

## Поддержка

Если возникли проблемы:

1. Проверьте логи в Netlify Dashboard
2. Убедитесь, что все environment variables добавлены корректно
3. Проверьте SMTP credentials в провайдере (Gmail/SendGrid/Mailgun)
4. Убедитесь, что сделан redeploy после добавления переменных

---

**Готово!** 🎉 Контактная форма теперь работает и отправляет email на указанный адрес.
