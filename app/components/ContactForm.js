'use client';

import React, { useState } from 'react';

const ContactForm = () => {
  // Состояния формы
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreement: false
  });

  // Состояния ошибок
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    agreement: ''
  });

  // Состояние отправки
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Форматирование телефона
  const formatPhone = (value) => {
    // Удаляем все нецифровые символы
    const phone = value.replace(/\D/g, '');
    
    // Форматируем телефон
    if (phone.length <= 1) return phone;
    if (phone.length <= 4) return `+${phone}`;
    if (phone.length <= 7) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4)}`;
    if (phone.length <= 9) return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
    return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
  };

  // Валидация формы
  const validateForm = () => {
    const errors = {
      name: '',
      phone: '',
      agreement: ''
    };
    let isValid = true;

    // Проверка имени
    if (!formData.name.trim()) {
      errors.name = 'Имя обязательно';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
      isValid = false;
    }

    // Проверка телефона
    if (!formData.phone.trim()) {
      errors.phone = 'Телефон обязателен';
      isValid = false;
    } else if (formData.phone.replace(/\D/g, '').length < 11) {
      errors.phone = 'Введите корректный номер телефона';
      isValid = false;
    }

    // Проверка согласия
    if (!formData.agreement) {
      errors.agreement = 'Необходимо согласие на обработку данных';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      // Очищаем форму после успешной отправки
      setFormData({ name: '', phone: '', agreement: false });
      
      // Убираем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setSubmitStatus({ loading: false, success: false, error: null });
      }, 5000);

    } catch (error) {
      setSubmitStatus({ 
        loading: false, 
        success: false, 
        error: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
          }}
          placeholder="Имя"
          className={`w-full p-6 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white ${
            formErrors.name 
              ? 'border-red-300 dark:border-red-700' 
              : 'border-neutral-200 dark:border-neutral-700'
          }`}
          disabled={submitStatus.loading}
        />
        {formErrors.name && (
          <p className="text-red-500 mt-1 text-sm">{formErrors.name}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: formatPhone(e.target.value) });
            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
          }}
          placeholder="+7 (___) ___-__-__"
          className={`w-full p-6 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white ${
            formErrors.phone 
              ? 'border-red-300 dark:border-red-700' 
              : 'border-neutral-200 dark:border-neutral-700'
          }`}
          disabled={submitStatus.loading}
        />
        {formErrors.phone && (
          <p className="text-red-500 mt-1 text-sm">{formErrors.phone}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreement}
            onChange={(e) => {
              setFormData({ ...formData, agreement: e.target.checked });
              if (formErrors.agreement) setFormErrors({ ...formErrors, agreement: '' });
            }}
            className="rounded border-neutral-300 dark:border-neutral-700 text-amber-700 focus:ring-amber-700/20"
            disabled={submitStatus.loading}
          />
          Даю согласие на обработку персональных данных
        </label>
        {formErrors.agreement && (
          <p className="text-red-500 mt-1 text-sm">{formErrors.agreement}</p>
        )}
      </div>

      {submitStatus.success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200">
            Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      )}

      {submitStatus.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{submitStatus.error}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-6 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitStatus.loading || !formData.agreement}
      >
        {submitStatus.loading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
      </button>
    </form>
  );
};

export default ContactForm;