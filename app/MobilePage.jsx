'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Users, Star, Award, BookOpen, Monitor, Heart, Brain, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';

const MobilePage = ({ supportItems, categories, stats, isDarkMode, setIsDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const offset = 60; // Высота мобильной шапки
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });

    setIsMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Мобильная навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-neutral-800 dark:text-white text-lg">Андрей</span>
            <span className="text-amber-700 text-lg">Малик</span>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="flex flex-col p-4">
              <button 
                onClick={() => scrollToSection('requests')}
                className="py-3 text-left text-neutral-600 dark:text-neutral-400"
              >
                ЗАПРОСЫ
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="py-3 text-left text-neutral-600 dark:text-neutral-400"
              >
                УСЛУГИ
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="py-3 text-left text-neutral-600 dark:text-neutral-400"
              >
                ОБО МНЕ
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="py-3 text-left text-neutral-600 dark:text-neutral-400"
              >
                КОНТАКТЫ
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero секция */}
      <section className="pt-16 min-h-screen relative bg-[#f6f2ec]">
        <div className="absolute inset-0">
          <img
            src="/images/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative px-4 py-12 text-center">
          <div className="flex flex-col gap-4 mb-8 justify-center">
            <span className="px-4 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm text-white">
              Индивидуальная терапия
            </span>
            <span className="px-4 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm text-white">
              Онлайн и лично (в Израиле)
            </span>
          </div>

          <h1 className="text-4xl text-white mb-4 font-extralight">
            Студент Психолог
          </h1>

          <div className="text-5xl text-white mb-6">
            <span className="font-roslindale">Андрей</span>&nbsp;
            <span className="font-extralight">Малик</span>
          </div>

          <p className="text-lg text-white/90 mb-8">
            Терапия, вдохновленная мудростью и спокойствием Рима
          </p>

          <button 
            onClick={() => scrollToSection('contacts')}
            className="mx-auto px-6 py-3 bg-white text-neutral-900 rounded-full flex items-center gap-2 text-sm"
          >
            Спланировать консультацию
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      {/* Навыки */}
      <section id="skills" className="px-4 py-12 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-neutral-800 dark:text-white mb-2">
            Ценные навыки, которые
          </h2>
          <p className="text-2xl text-amber-700/90 font-roslindale">вы приобретёте</p>
        </div>

        <div className="space-y-4">
          {[
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
            }
          ].map((skill, index) => (
            <motion.div 
              key={index}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg"
            >
              <h3 className="text-lg text-neutral-800 dark:text-white mb-3 font-light">
                {skill.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Проблемы */}
      <section className="px-4 py-12 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-neutral-800 dark:text-white font-light">
            Когда что-то идет не так -
          </h2>
          <h2 className="text-3xl text-amber-700/90 font-light font-roslindale">
            мы справимся
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-sm">
            Проблемы, которые больше не придется решать в одиночку
          </p>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} ${category.darkGradient} p-6 rounded-2xl border ${category.borderColor} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl bg-white/80 dark:bg-neutral-800/80 ${category.borderColor}`}>
                  <category.icon size={18} className={category.iconColor} />
                </div>
                <h3 className="text-lg text-[#544B42] dark:text-white font-light">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3">
                {category.problems.map((problem, pIndex) => (
                  <div
                    key={pIndex}
                    className="group flex items-start gap-2 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-all"
                  >
                    <div className={`w-2 h-2 mt-2 rounded-full bg-opacity-30 ${category.iconColor}`} />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {problem}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Поддержка */}
      <section id="requests" className="py-12 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="px-4">
          <div className="mb-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-amber-700/90 text-3xl font-light font-roslindale">
                Поддержу
              </h2>
              <h2 className="text-neutral-800 dark:text-white text-3xl font-light">
                в решении трудностей
              </h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-sm text-center">
              Мысли, которые разрушительно влияют на нас и окружение
            </p>
          </div>

          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
            <div className="flex gap-4">
              {supportItems.map((item, index) => (
                <motion.div 
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[280px] flex-shrink-0 bg-[#E1EAD7] dark:bg-neutral-800/80 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700 flex flex-col"
                >
                  <div className="text-neutral-400 text-base italic">{item.number}</div>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 text-base mt-auto mb-6">
                    {item.title}
                  </p>

                  <div className="w-full h-[160px] overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section className="px-4 py-12 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-neutral-800 dark:text-white">
              Можно ли разорвать эти циклы? Найти ответы? Почувствовать себя лучше?
              <br /><br />
              <span className="font-roslindale">Можно. Шаг за шагом.</span>
              <span className="text-amber-700/90 font-roslindale"> И я помогу.</span>
            </h2>
          </div>
          
          <div className="w-3/4">
            <div className="aspect-square rounded-full overflow-hidden border-4 border-amber-700/20">
              <img 
                src="/images/new.png" 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Обо мне */}
      <section id="about" className="px-4 py-12 bg-white dark:bg-neutral-900">
        <div className="mb-8">
          <h2 className="text-[#544B42] dark:text-white text-3xl font-light">
            Меня <span className="text-amber-700 font-roslindale">зовут</span>
          </h2>
          <h2 className="text-[#544B42] dark:text-white text-3xl font-light">
            Андрей Малик
          </h2>
        </div>

        <div className="space-y-8 mb-8">
          {[
            {
              number: "01",
              text: "Психолог-студент, Эмоционально-Образный терапевт, КПТ терапевт"
            },
            {
              number: "02",
              text: "Обучалаюсь в МИП и в Институте ЭОТ"
            },
            {
              number: "03",
              text: "Регулярно прохожу супервизию и личную терапию"
            },
            {
              number: "04",
              text: "Моя миссия в работе — быть рядом и поддерживать вас на новом пути"
            }
          ].map((item, index) => (
            <div key={index} className="group">
              <h3 className="text-neutral-400 mb-2">{item.number}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <img
          src="/images/ps.png"
          alt="Профессиональный портрет"
          loading="lazy"
          className="rounded-lg w-full h-auto object-cover"
        />
      </section>

      {/* Статистика */}
      <section className="px-4 py-12 bg-white dark:bg-neutral-900">
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-700" />
              <div className="text-neutral-800 dark:text-white text-3xl font-light">{stat.value}</div>
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Форматы работы */}
      <section id="service-formats" className="px-4 py-12 bg-white dark:bg-neutral-900">
        <h2 className="text-neutral-800 dark:text-white text-3xl font-light mb-8">
          Форматы работы
        </h2>

        <div className="space-y-4">
          {[
            {
              icon: Users,
              title: "Индивидуальная терапия",
              description: "Персональные сессии для глубокой проработки личных запросов и достижения ваших целей",
              price: "от 1000 рублей",
              duration: "75 минут"
            },
            {
              icon: MessageCircle,
              title: "Онлайн консультация",
              description: "Удобный формат работы из любой точки мира через Zoom или другие платформы",
              price: "от 500 рублей",
              duration: "75 минут"
            },
            {
              icon: Calendar,
              title: "Пробная встреча",
              description: "Знакомство и обсуждение запроса для определения формата дальнейшей работы",
              price: "Бесплатно",
              duration: "30 минут"
            }
          ].map((service, index) => (
            <motion.div 
              key={index}
              whileTap={{ scale: 0.98 }}
              className="bg-[#f6f2ec] dark:bg-neutral-800 p-6 rounded-2xl"
            >
              <div className="text-amber-700 mb-4">
                <service.icon size={24} />
              </div>
              <h3 className="text-lg text-neutral-800 dark:text-white mb-3">{service.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {service.description}
              </p>
              <div className="flex justify-between items-center text-neutral-800 dark:text-white text-sm">
                <span>{service.price}</span>
                <span>{service.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="px-4 py-12 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="text-center mb-8">
          <h2 className="text-[#544B42] dark:text-white text-3xl font-light mb-6">
            Начните новую жизнь
            <br />
            <span className="text-amber-700 font-roslindale">уже сегодня</span>
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
          </p>
        </div>

        <img
          src="/images/contacts.png"
          alt="Контактное изображение"
          loading="lazy"
          className="rounded-lg w-full h-auto object-cover mb-6"
        />

        <ContactForm />
      </section>

      {/* Футер */}
      <footer className="px-4 py-12 bg-[#f6f2ec] dark:bg-neutral-900 border-t-[20px] border-neutral-100 dark:border-neutral-700">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
              <span className="text-amber-700 text-2xl">Малик</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
          </div>

          <a 
            href="tel:+97253861117" 
            className="text-3xl text-neutral-600 dark:text-white hover:text-amber-700"
          >
            +972 (53) 861-1117
          </a>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-amber-700 text-white"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </footer>
      
    </div>
  );
};

export default MobilePage;