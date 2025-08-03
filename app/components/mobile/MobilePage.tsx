'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Menu, X, Phone, ArrowUpRight, Users, Star, Award, BookOpen,
  Monitor, Heart, Brain, MessageCircle, Calendar, ChevronDown,
  ArrowUp, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Интерфейсы
interface SupportItem {
  number: string;
  title: string;
  image: string;
}

interface FormData {
  name: string;
  phone: string;
  agreement: boolean;
}

// Компонент мобильной навигации
function MobileNavigation({ isMenuOpen, setIsMenuOpen, activeSection, isDarkMode, setIsDarkMode }) {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  return (
    <>
      {/* Фиксированная шапка */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-neutral-800 dark:text-white text-xl font-medium">Андрей</span>
            <span className="text-amber-700 text-xl font-medium">Малик</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Переключить тему"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Открыть меню"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Полноэкранное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-900"
          >
            <div className="pt-20 px-6 h-full flex flex-col">
              <nav className="space-y-6 flex-grow">
                {[
                  { id: 'skills', label: 'УСЛУГИ' },
                  { id: 'requests', label: 'ЗАПРОСЫ ДЛЯ РАБОТЫ' },
                  { id: 'about', label: 'ОБО МНЕ' },
                  { id: 'contacts', label: 'КОНТАКТЫ' }
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-2xl font-light transition-colors py-3 border-b border-neutral-100 dark:border-neutral-800 ${
                      activeSection === item.id 
                        ? 'text-amber-700' 
                        : 'text-neutral-800 dark:text-white hover:text-amber-700'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
              
              <div className="pb-8">
                <motion.a
                  href="tel:+97253861117"
                  className="flex items-center gap-3 text-amber-700 text-xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Phone size={24} />
                  +972 (53) 861-1117
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Мобильный герой
function MobileHero({ scrollToSection }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen bg-[#f6f2ec] dark:bg-neutral-900 overflow-hidden">
      {/* Фоновое изображение */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <img
          src="/images/backgroundmob.png"
          alt="Professional portrait"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* ВЕРХНИЙ БЛОК - всегда вверху */}
      <div className="absolute top-0 left-0 right-0 pt-20 px-6">
        {/* Клинический психолог */}
        <motion.h1 
          className="text-white text-4xl font-light mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Клинический<br />Психолог
        </motion.h1>
        
        {/* Андрей Малик */}
        <motion.div className="flex justify-end mb-2">
          <h1 
            className="text-white text-5xl leading-tight text-right font-roslindale"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Андрей Малик
          </h1>
        </motion.div>

        {/* Терапия вдохновленная мудростью */}
        <motion.div className="flex justify-end">
          <p 
            className="text-white/90 text-base leading-relaxed max-w-xs text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Терапия, вдохновленная<br /> мудростью Рима
          </p>
        </motion.div>
      </div>

      {/* НИЖНИЙ БЛОК - всегда внизу */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 px-6">
        {/* Индивидуальная терапия и Онлайн */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
            Индивидуальная терапия
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
            Онлайн и лично (в Израиле)
          </span>
        </motion.div>

        {/* Спланировать консультацию */}
        <motion.button 
          onClick={() => scrollToSection('contacts')}
          className="w-full py-4 bg-white text-neutral-900 rounded-full text-center font-medium hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Спланировать консультацию
          <ArrowUpRight size={18} />
        </motion.button>
      </div>
    </section>
  );
}

// Мобильные навыки
function MobileSkills() {
  const skills = [
    {
      title: "Понимание себя и своих истинных желаний",
      description: "Глубокая работа над осознанием внутренних потребностей и желаний, помогает принять себя любым"
    },
    {
      title: "Умение управлять стрессом и тревогой",
      description: "Освоение техник, которые улучшают качество жизни, помогают фокусировать внутреннее спокойствие"
    },
    {
      title: "Стабильная и прочная внутренняя опора",
      description: "Помогает сохранять устойчивость и уверенность в любых жизненных ситуациях"
    },
    {
      title: "Принятие прошлого и отпускание обид",
      description: "Проработка прошлых травм и обид помогает освободиться от их влияния, вы начинаете жить в настоящем"
    },
    {
      title: "Навыки адаптации к изменениям жизни",
      description: "Способность гибко реагировать на перемены, минимизируя стресс и сохраняя внутреннюю стабильность"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="skills" className="py-16 bg-[#f6f2ec] dark:bg-neutral-900 px-6" ref={ref}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-2">
          Ценные навыки, которые
        </h2>
        <p className="text-2xl text-amber-700 font-roslindale">вы приобретёте</p>
      </motion.div>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700"
          >
            <h3 className="text-lg font-medium text-neutral-800 dark:text-white mb-3 leading-tight">
              {skill.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Мобильные проблемы
function MobileProblems() {
  const categories = [
    {
      title: "Зависимости",
      icon: Monitor,
      color: "purple",
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
      color: "teal",
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
      color: "pink",
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
      color: "yellow",
      problems: [
        "Накручиваю себя и не вижу выхода",
        "В понедельник я раздавлен",
        "Не могу заснуть и листаю ленту до ночи"
      ]
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const getColorClasses = (color) => {
    const colors = {
      purple: "from-purple-50 to-blue-50 dark:from-purple-950/40 dark:to-blue-950/40 border-purple-100 dark:border-purple-900/30 text-purple-500",
      teal: "from-teal-50 to-green-50 dark:from-teal-950/40 dark:to-green-950/40 border-teal-100 dark:border-teal-900/30 text-teal-500",
      pink: "from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40 border-pink-100 dark:border-pink-900/30 text-pink-500",
      yellow: "from-yellow-50 to-amber-50 dark:from-yellow-950/40 dark:to-amber-950/40 border-yellow-100 dark:border-yellow-900/30 text-yellow-600"
    };
    return colors[color];
  };

  return (
    <section className="py-16 bg-white dark:bg-neutral-900 px-6" ref={ref}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-2">
          Когда что-то идет не так -
        </h2>
        <p className="text-2xl text-amber-700 font-roslindale">мы справимся</p>
        <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-sm">
          Проблемы, которые больше не придется решать в одиночку
        </p>
      </motion.div>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`bg-gradient-to-br ${getColorClasses(category.color)} p-6 rounded-xl border backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/80 dark:bg-neutral-800/80">
                <category.icon size={20} className={getColorClasses(category.color).split(' ').pop()} />
              </div>
              <h3 className="text-lg font-medium text-neutral-800 dark:text-white">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {category.problems.map((problem, pIndex) => (
                <div key={pIndex} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 mt-2 rounded-full ${getColorClasses(category.color).split(' ').pop()} opacity-60`} />
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm italic">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Мобильная цитата
function MobileQuote() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section className="py-16 bg-[#f6f2ec] dark:bg-neutral-900 px-6" ref={ref}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-3 border-amber-700/20">
            <img 
              src="/images/new.png" 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-light text-neutral-800 dark:text-white leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Можно ли разорвать эти циклы? Найти ответы? Почувствовать себя лучше?
          <br /><br />
          <span className="font-roslindale">Можно. Шаг за шагом.</span>
          <span className="text-amber-700 font-roslindale"> И я помогу.</span>
        </motion.h2>
      </div>
    </section>
  );
}

// Мобильная поддержка с горизонтальным скроллом
function MobileSupport({ scrollToSection }) {
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="requests" className="py-16 bg-[#f6f2ec] dark:bg-neutral-900" ref={ref}>
      <div className="px-6">
        {/* Заголовок и описание - выравнивание по правому краю */}
        <div className="mb-12 text-left">
          <motion.h2 
            className="text-3xl font-light text-neutral-800 dark:text-white mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-700 font-roslindale">Поддержу</span> в решении трудностей
          </motion.h2>
          
          <motion.p 
            className="text-neutral-500 dark:text-neutral-400 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Мысли, которые разрушительно<br />  влияют на нас и окружение
          </motion.p>
        </div>
      </div>

          
      {/* Горизонтальный скролл */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-6 pb-4" style={{ width: 'max-content' }}>
          {supportItems.map((item, index) => (
            <motion.div 
              key={`support-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex-shrink-0 w-80 bg-[#E1EAD7] dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="text-neutral-400 text-lg italic mb-4">{item.number}</div>
              
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-6">
                {item.title}
              </p>

              <div className="w-full h-48 overflow-hidden rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Индикатор скролла */}
      <div className="flex justify-center mt-6 px-6">
        <div className="flex gap-2">
          {supportItems.map((_, index) => (
            <div 
              key={index}
              className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Мобильная секция "Обо мне"
function MobileAbout() {
  const aboutItems = [
    {
      number: "01",
      text: "Эмоционально-Образный терапевт, Когнитивно поведенческий терапевт"
    },
    {
      number: "02",
      text: "Окончил Московский Институт Психоанализа (МИП) и Институт ЭОТ"
    },
    {
      number: "03",
      text: "Регулярно прохожу супервизию и личную терапию"
    },
    {
      number: "04",
      text: "Постоянно повышаю свою квалификацию на професиональных курсах"
    },
    {
      number: "05",
      text: "Моя миссия в работе — быть рядом и поддерживать вас на новом пути"
    }
  ];

  const stats = [
    { icon: Users, value: '20+', label: 'довольных клиентов' },
    { icon: Star, value: '4.9', label: 'средняя оценка' },
    { icon: Award, value: '1', label: 'год практики' },
    { icon: BookOpen, value: '100+', label: 'часов консультаций' }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-16 bg-white dark:bg-neutral-900 px-6" ref={ref}>
      {/* Заголовок */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-2">
          Меня <span className="text-amber-700 font-roslindale">зовут</span>
        </h2>
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white">Андрей Малик</h2>
      </motion.div>

      {/* Информация - список */}
      <div className="space-y-6 mb-12">
        {aboutItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            className="border-l-2 border-amber-700/20 pl-4"
          >
            <h3 className="text-neutral-400 text-sm mb-2">{item.number}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Фото - перенесено под список */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-full h-64 rounded-xl overflow-hidden relative">
          <Image
            src="/images/ps.png"
            alt="Профессиональный портрет"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Статистика */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Горизонтальная разделительная линия сверху */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent mb-8"></div>
        
        <div className="grid grid-cols-2 gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="relative text-center p-6">
              {/* Вертикальная разделительная линия */}
              {index % 2 === 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"></div>
              )}
              
              {/* Горизонтальная разделительная линия между рядами */}
              {index < 2 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"></div>
              )}
              
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-700" />
              <div className="text-2xl font-light text-neutral-800 dark:text-white mb-1">{stat.value}</div>
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Горизонтальная разделительная линия снизу */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent mt-8"></div>
      </motion.div>
    </section>
  );
}

// Мобильные форматы услуг
function MobileServiceFormats() {
  const services = [
    {
      icon: Users,
      title: "Индивидуальная терапия",
      description: "Персональные сессии для глубокой проработки личных запросов и достижения ваших целей",
      price: "от 1500 рублей",
      duration: "75 минут"
    },
    {
      icon: MessageCircle,
      title: "Онлайн консультация",
      description: "Удобный формат работы из любой точки мира через WhatsApp или другие платформы",
      price: "от 2000 рублей",
      duration: "75 минут"
    },
    {
      icon: Calendar,
      title: "Пробная встреча",
      description: "Знакомство и обсуждение запроса для определения формата дальнейшей работы",
      price: "Бесплатно",
      duration: "30 минут"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-[#f6f2ec] dark:bg-neutral-900 px-6" ref={ref}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-2">
          Форматы работы
        </h2>
      </motion.div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-amber-700">
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-medium text-neutral-800 dark:text-white">{service.title}</h3>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              {service.description}
            </p>
            
            <div className="flex justify-between items-center pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <span className="text-neutral-800 dark:text-white font-medium">{service.price}</span>
              <span className="text-neutral-600 dark:text-neutral-400">{service.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Мобильная форма контактов
function MobileContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    agreement: false
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    agreement: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { name: '', phone: '', agreement: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
      isValid = false;
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setFormData({ name: '', phone: '', agreement: false });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-700/50 transition-all"
        />
        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Ваш телефон"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-700/50 transition-all"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreement}
            onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
            className="mt-1 w-5 h-5 text-amber-700 border border-neutral-300 dark:border-neutral-600 rounded focus:ring-amber-700"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Согласен на обработку персональных данных и получение информационных сообщений
          </span>
        </label>
        {errors.agreement && <p className="text-red-500 text-sm mt-2">{errors.agreement}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-700/50 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            Отправка...
          </>
        ) : (
          <>
            Отправить заявку
            <ArrowUpRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}

// Мобильные контакты
function MobileContacts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contacts" className="py-16 bg-white dark:bg-neutral-900 px-6" ref={ref}>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-4">
          Начните новую жизнь<br />
          <span className="text-amber-700 font-roslindale">уже сегодня</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
        </p>
      </motion.div>

      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <img
          src="/images/contacts.png"
          alt="Контактное изображение"
          className="rounded-xl w-full h-48 object-cover"
        />
        <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-center">
          Мы можем обсудить любой вопрос, который волнует вас
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <MobileContactForm />
      </motion.div>
    </section>
  );
}

// Мобильный футер
function MobileFooter({ scrollToSection, isDarkMode, setIsDarkMode }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f6f2ec] dark:bg-neutral-900 border-t-4 border-neutral-200 dark:border-neutral-700 py-12 px-6">
      <div className="text-center space-y-8">
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-neutral-800 dark:text-white text-2xl font-medium">Андрей</span>
            <span className="text-amber-700 text-2xl font-medium">Малик</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { id: 'skills', label: 'УСЛУГИ' },
            { id: 'requests', label: 'ЗАПРОСЫ' },
            { id: 'about', label: 'ОБО МНЕ' },
            { id: 'contacts', label: 'КОНТАКТЫ' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors py-2"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <a 
            href="tel:+97253861117" 
            className="text-2xl text-neutral-600 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors"
          >
            +972 (53) 861-1117
          </a>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Переключить тему"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-amber-700 hover:bg-amber-800 transition-colors"
            aria-label="Наверх"
          >
            <ArrowUp size={20} className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}

// Основной компонент мобильной страницы
export default function MobilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['skills', 'requests', 'about', 'contacts'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`mobile-version ${isDarkMode ? 'dark' : ''}`}>
      <MobileNavigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      
      <MobileHero scrollToSection={scrollToSection} />
      <MobileSkills />
      <MobileProblems />
      <MobileQuote />
      <MobileSupport scrollToSection={scrollToSection} />
      <MobileAbout />
      <MobileServiceFormats />
      <MobileContacts />
      
      <MobileFooter 
        scrollToSection={scrollToSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
}