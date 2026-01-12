import { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import nodemailer from 'nodemailer';

/**
 * Netlify Function для обработки контактной формы
 * Бесплатная версия с SMTP отправкой
 */

// Простая валидация email (RFC 5322)
const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Валидация телефона (Казахстан)
const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[^\d+]/g, '');
  const phoneRegex = /^(\+7|8|7)\d{10}$/;
  return phoneRegex.test(cleaned);
};

// Валидация имени
const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) return false;
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ\s\-']+$/;
  return nameRegex.test(trimmed);
};

// Валидация сообщения
const validateMessage = (message: string): boolean => {
  if (!message || typeof message !== 'string') return false;
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 2000;
};

// Санитизация входных данных
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Rate limiting (in-memory хранилище)
// Примечание: В продакшене используйте Redis или другое персистентное хранилище
const rateLimitStore = new Map<string, number[]>();

const checkRateLimit = (identifier: string, maxAttempts = 5, windowMs = 60000): boolean => {
  const now = Date.now();
  const attempts = rateLimitStore.get(identifier) || [];

  // Удаляем старые попытки
  const recentAttempts = attempts.filter(time => now - time < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    return false; // Rate limit exceeded
  }

  recentAttempts.push(now);
  rateLimitStore.set(identifier, recentAttempts);

  // Очистка старых записей (каждые 5 минут)
  if (Math.random() < 0.01) {
    for (const [key, times] of rateLimitStore.entries()) {
      const valid = times.filter(time => now - time < windowMs);
      if (valid.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, valid);
      }
    }
  }

  return true;
};

// Проверка CSRF токена (базовая проверка)
const validateCSRFToken = (token: string, timestamp: number): boolean => {
  if (!token || typeof token !== 'string') return false;
  if (!timestamp || typeof timestamp !== 'number') return false;

  // Токен должен быть создан не позднее 1 часа назад
  const oneHour = 60 * 60 * 1000;
  if (Date.now() - timestamp > oneHour) return false;

  // Токен должен быть валидной hex-строкой длиной 64 символа
  const tokenRegex = /^[a-f0-9]{64}$/;
  return tokenRegex.test(token);
};

// Отправка email через SMTP
// Для бесплатной версии используйте: Gmail SMTP, SendGrid Free (100 emails/day), или Mailgun Free (100 emails/day)
const sendEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> => {
  // Настройка SMTP транспорта
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Ваш email
      pass: process.env.SMTP_PASS, // App password для Gmail или API key для SendGrid
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'info@digital-security-center.kz',
    to: process.env.NOTIFY_EMAIL || 'info@digital-security-center.kz',
    subject: `Новая заявка с сайта от ${data.name}`,
    html: `
      <h2>Новая заявка с сайта Digital Security Center</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Телефон:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      <p><strong>Сообщение:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Получено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}</small></p>
    `,
    text: `
Новая заявка с сайта Digital Security Center

Имя: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}

Сообщение:
${data.message}

---
Получено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', process.env.NOTIFY_EMAIL);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Главный handler
export const handler: Handler = async (
  event: HandlerEvent
): Promise<HandlerResponse> => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // В продакшене укажите ваш домен
    'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, message, csrfToken, timestamp } = body;

    // Rate limiting по IP адресу
    const clientIP = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(clientIP, 5, 60000)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Слишком много попыток. Пожалуйста, подождите минуту.',
        }),
      };
    }

    // CSRF token validation
    if (!validateCSRFToken(csrfToken, timestamp)) {
      console.warn(`Invalid CSRF token from IP: ${clientIP}`);
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: 'Недействительный токен безопасности. Обновите страницу и попробуйте снова.',
        }),
      };
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message),
    };

    // Validate all fields
    const errors: string[] = [];

    if (!validateName(sanitizedData.name)) {
      errors.push('Имя должно содержать от 2 до 100 символов');
    }

    if (!validateEmail(sanitizedData.email)) {
      errors.push('Введите корректный email адрес');
    }

    if (!validatePhone(sanitizedData.phone)) {
      errors.push('Введите корректный номер телефона');
    }

    if (!validateMessage(sanitizedData.message)) {
      errors.push('Сообщение должно содержать от 10 до 2000 символов');
    }

    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Ошибка валидации',
          details: errors,
        }),
      };
    }

    // Отправка email
    const emailSent = await sendEmail(sanitizedData);

    if (!emailSent) {
      console.error('Failed to send email for:', sanitizedData.email);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Ошибка отправки сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
        }),
      };
    }

    // Success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.',
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.',
      }),
    };
  }
};
