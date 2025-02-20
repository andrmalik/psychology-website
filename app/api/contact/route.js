// app/api/contact/route.js
import { Resend } from 'resend';

// Инициализируем Resend с API ключом
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Получаем данные из запроса
    const { name, phone } = await req.json();

    // Отправляем email
    const { data, error } = await resend.emails.send({
      from: 'Ваш сайт <onboarding@resend.dev>', // Это будет отображаться как отправитель
      to: process.env.CONTACT_EMAIL, // Email для получения заявок
      subject: 'Новая заявка на консультацию',
      html: `
        <h2>Новая заявка на консультацию</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return Response.json(
        { error: 'Ошибка при отправке email' },
        { status: 400 }
      );
    }

    return Response.json({ 
      success: true,
      message: 'Заявка успешно отправлена'
    });

  } catch (error) {
    console.error('Server error:', error);
    return Response.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}