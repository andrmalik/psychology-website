'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, Users, Heart, Brain, Star, Award, BookOpen } from 'lucide-react';
import MobilePage from './MobilePage';
import DesktopPage from './DesktopPage';

// Типы данных остаются те же
interface SupportItem {
  number: string;
  title: string;
  image: string;
}

interface Category {
  title: string;
  icon: any;
  gradient: string;
  darkGradient: string;
  borderColor: string;
  iconColor: string;
  problems: string[];
}

interface Stat {
  icon: any;
  value: string;
  label: string;
}

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    
    // Первичная проверка
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Данные остаются те же
  const supportItems: SupportItem[] = [
    {
      number: "1",
      title: "Стремлюсь к идеальности, которая сопровождается постоянным стрессом",
      image: "/images/2.png"
    },
    {
      number: "2",
      title: "Не хочу соответствовать ожиданиям других людей, хочу быть настоящим",
      image: "/images/1.png"
    },
    {
      number: "3",
      title: "Споры с близкими людьми, которые разрушают наши отношения",
      image: "/images/6.png"
    },
    {
      number: "4",
      title: "Сложности в принятии важных решений и страх перед будущим",
      image: "/images/3.png"
    },
    {
      number: "5",
      title: "Потеря мотивации и интереса к любимому делу",
      image: "/images/4.png"
    },
    {
      number: "6",
      title: "Чувство одиночества и сложности в построении отношений",
      image: "/images/5.png"
    }
  ];

  const categories: Category[] = [
    {
      title: "Зависимости",
      icon: Monitor,
      gradient: "from-blue-50 to-purple-50",
      darkGradient: "dark:from-blue-950/40 dark:to-purple-950/40",
      borderColor: "border-purple-100 dark:border-purple-900/30",
      iconColor: "text-purple-400",
      problems: [
        "Не могу оторваться от компьютера и любимой игры",
        "Ищу утешение и радость в алкоголе",
        "Тревожусь из-за новостей",
        "Соц сети меня поглотили"
      ]
    },
    {
      title: "Трудности в общении",
      icon: Users,
      gradient: "from-green-50 to-teal-50",
      darkGradient: "dark:from-green-950/40 dark:to-teal-950/40",
      borderColor: "border-teal-100 dark:border-teal-900/30",
      iconColor: "text-teal-400",
      problems: [
        "Не могу спокойно говорить с родными, часто крики и агрессия",
        "Меня не понимают",
        "Мне не комфортно среди людей",
        "Долго не общался с родителями"
      ]
    },
    {
      title: "Отношения",
      icon: Heart,
      gradient: "from-rose-50 to-pink-50",
      darkGradient: "dark:from-rose-950/40 dark:to-pink-950/40",
      borderColor: "border-pink-100 dark:border-pink-900/30",
      iconColor: "text-pink-400",
      problems: [
        "Мой партнер унижает меня",
        "Я боюсь отказать, ведь тогда меня бросят",
        "Как раньше уже не будет",
        "Мной манипулируют"
      ]
    },
    {
      title: "Эмоциональная усталость, тревога",
      icon: Brain,
      gradient: "from-amber-50 to-yellow-50",
      darkGradient: "dark:from-amber-950/40 dark:to-yellow-950/40",
      borderColor: "border-yellow-100 dark:border-yellow-900/30",
      iconColor: "text-yellow-400",
      problems: [
        "Накручиваю себя и не вижу выхода",
        "В понедельник я раздавлен",
        "Не могу заснуть и листаю ленту до ночи"
      ]
    }
  ];

  const stats: Stat[] = [
    { icon: Users, value: '20+', label: 'довольных клиентов' },
    { icon: Star, value: '4.9', label: 'средняя оценка' },
    { icon: Award, value: '1', label: 'год практики' },
    { icon: BookOpen, value: '100+', label: 'часов консультаций' }
  ];

  return (
    <div className="min-h-screen">
      {isMobile ? (
        <MobilePage
          supportItems={supportItems}
          categories={categories}
          stats={stats}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      ) : (
        <DesktopPage
          supportItems={supportItems}
          categories={categories}
          stats={stats}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}
    </div>
  );
};

export default Page;