'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Динамическая загрузка компонентов для оптимизации
const DesktopPage = dynamic(() => import('./desktop/DesktopPage'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const MobilePage = dynamic(() => import('./mobile/MobilePage'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f2ec] dark:bg-neutral-900">
      <div className="flex flex-col items-center gap-4">
        <div className="loading-spinner rounded-full h-12 w-12 border-2 border-amber-700 border-t-transparent"></div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light">Загрузка...</p>
      </div>
    </div>
  );
}

export default function DeviceDetector() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectDevice = () => {
      // Более точная детекция устройства
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Проверка мобильных устройств
      const mobileKeywords = [
        'android', 'webos', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'iemobile', 'opera mini', 
        'mobile', 'tablet'
      ];
      
      const isMobileUserAgent = mobileKeywords.some(keyword => 
        userAgent.includes(keyword)
      );

      // Проверка размера экрана
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isSmallScreen = screenWidth <= 768;
      const isTabletPortrait = screenWidth <= 1024 && screenHeight > screenWidth;

      // Проверка touch support
      const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        (window.DocumentTouch && document instanceof window.DocumentTouch);

      // Проверка ориентации устройства
      const isPortrait = screenHeight > screenWidth;

      // Определяем устройство с учетом всех факторов
      const isMobile = isMobileUserAgent || 
                      isSmallScreen || 
                      (isTouchDevice && (isSmallScreen || isTabletPortrait));

      setDeviceType(isMobile ? 'mobile' : 'desktop');
      setIsLoading(false);

      // Добавляем классы к body для CSS
      document.body.className = `${isMobile ? 'mobile-device' : 'desktop-device'}`;
      
      // Добавляем дополнительные классы для отладки
      if (process.env.NODE_ENV === 'development') {
        document.body.classList.add(isMobile ? 'debug-mobile' : 'debug-desktop');
      }

      // Устанавливаем CSS переменные для viewport
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
    };

    // Небольшая задержка для корректной инициализации
    const timer = setTimeout(detectDevice, 50);

    // Слушаем изменения размера окна с debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const shouldBeMobile = newWidth <= 768;
        const currentIsMobile = deviceType === 'mobile';

        if (shouldBeMobile !== currentIsMobile) {
          setDeviceType(shouldBeMobile ? 'mobile' : 'desktop');
          document.body.className = `${shouldBeMobile ? 'mobile-device' : 'desktop-device'}`;
          
          if (process.env.NODE_ENV === 'development') {
            document.body.classList.add(shouldBeMobile ? 'debug-mobile' : 'debug-desktop');
          }
        }

        // Обновляем CSS переменные
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
      }, 100);
    };

    // Слушаем изменения ориентации
    const handleOrientationChange = () => {
      setTimeout(detectDevice, 500); // Задержка для корректного определения размеров
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [deviceType]);

  // Error boundary для безопасности
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Device detection error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Если произошла ошибка, показываем fallback
  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Что-то пошло не так</h2>
        <p>Пожалуйста, обновите страницу</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          Обновить страницу
        </button>
      </div>
    );
  }

  // Показываем загрузку пока определяем устройство
  if (isLoading || !deviceType) {
    return <LoadingSpinner />;
  }

  // Рендерим соответствующую версию
  return (
    <div className={`app-container ${deviceType}-version`}>
      {deviceType === 'mobile' ? <MobilePage /> : <DesktopPage />}
    </div>
  );
}