'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowUp, Moon, Sun, MessageCircle, Calendar, Star, Award, Users, Brain, BookOpen, Monitor, Heart } from 'lucide-react';
import _ from 'lodash';
import ContactForm from './components/ContactForm';

const DesktopPage = ({ supportItems, categories, stats, isDarkMode, setIsDarkMode }) => {
  // States
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  
  // Refs
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const scrollToSection = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const navHeight = 80; // Высота навигации
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }, []);

  // Scroll observer
  const handleScroll = useCallback(
    _.debounce(() => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    }, 100),
    [lastScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-amber-700 origin-[0%]"
          style={{ scaleX }}
        />

        <div className="py-4 px-12 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
            <span className="text-amber-700 text-2xl">Малик</span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex gap-12 text-sm tracking-wide">
              <button 
                onClick={() => scrollToSection('requests')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
              >
                ЗАПРОСЫ
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
              >
                УСЛУГИ
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
              >
                ОБО МНЕ
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
              >
                КОНТАКТЫ
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-neutral-800 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen w-full flex items-end bg-[#f6f2ec]">
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        >
          <img
            src="/images/background.png"
            alt="Professional portrait"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-12 w-1/2 text-right pb-48 ml-auto translate-x-[360px]">
          <div className="flex gap-4 mb-12 justify-end">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm tracking-wide text-white"
            >
              Индивидуальная терапия
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm tracking-wide text-white"
            >
              Онлайн и лично (в Израиле)
            </motion.span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl text-white mb-2 font-extralight tracking-wide"
          >
            Студент Психолог
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-8xl text-white mb-6 tracking-wide"
          >
            <span className="font-roslindale">Андрей</span>&nbsp;
            <span className="font-extralight">Малик</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-white/90 mb-12 tracking-wide ml-auto max-w-xl"
          >
            Терапия, вдохновленная мудростью и спокойствием Рима
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <button 
              onClick={() => scrollToSection('contacts')}
              className="px-8 py-4 bg-white text-neutral-900 rounded-full flex items-center gap-3 hover:bg-neutral-100 transition-all text-sm tracking-wide group"
            >
              Спланировать консультацию
              <ArrowUpRight 
                size={18} 
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-light text-neutral-800 dark:text-white mb-2">
              Ценные навыки, которые
            </h2>
            <p className="text-4xl text-amber-700/90 font-roslindale">вы приобретёте</p> 
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
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
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 p-12 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl text-neutral-800 dark:text-white mb-6 font-light">
                  {skill.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 px-32">
            {[
              {
                title: "Принятие прошлого и отпускание обид",
                description: "Проработка прошлых травм и обид помогает освободиться от их влияния, вы начинаете жить в настоящем"
              },
              {
                title: "Навыки адаптации к изменениям жизни",
                description: "Способность гибко реагировать на перемены, минимизируя стресс и сохраняя внутреннюю стабильность"
              }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 p-12 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl text-neutral-800 dark:text-white mb-6 font-light">
                  {skill.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative z-20 py-24 bg-[#f6f2ec] dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <div className="flex items-baseline gap-4 justify-center">
              <h2 className="text-neutral-800 dark:text-white text-5xl font-light">
                Когда что-то идет не так -
              </h2>
              <h2 className="text-amber-700/90 text-5xl font-light font-roslindale">
                мы справимся
              </h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mt-4">
              Проблемы, которые больше не придется решать в одиночку
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} ${category.darkGradient} p-8 rounded-2xl border ${category.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 ${category.borderColor}`}>
                    <category.icon size={24} className={category.iconColor} />
                  </div>
                  <h3 className="text-xl text-[#544B42] dark:text-white font-light">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.problems.map((problem, pIndex) => (
                    <div
                      key={pIndex}
                      className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-all duration-300"
                    >
                      <div className={`w-2 h-2 mt-2 rounded-full bg-opacity-30 ${category.iconColor} group-hover:scale-110 transition-all duration-300`} />
                      <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                        {problem}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="requests" className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="w-full pr-0 pl-[max(12rem,calc((100vw-90rem)/2))]">
          <div className="flex justify-between items-start mb-32">
            <div className="flex items-baseline gap-4">
              <h2 className="text-amber-700/90 text-5xl font-light font-roslindale">
                Поддержу
              </h2>
              <h2 className="text-neutral-800 dark:text-white text-5xl font-light">
                в решении трудностей
              </h2>
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-md text-right mr-24">
              Мысли, которые разрушительно влияют на нас и окружение
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-20 left-0 flex gap-3">
              <button 
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollBy({ left: -container.offsetWidth / 2, behavior: 'smooth' });
                  }
                }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft size={20} className="text-amber-700" />
              </button>
              <button 
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollBy({ left: container.offsetWidth / 2, behavior: 'smooth' });
                  }
                }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <ArrowRight size={20} className="text-amber-700" />
              </button>
            </div>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar gap-8"
            >
              {supportItems.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -8 }}
                  className="min-w-[320px] h-[480px] flex-shrink-0 bg-[#E1EAD7] dark:bg-neutral-800/80 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 flex flex-col hover:shadow-xl transition-all duration-300"
                  style={{ width: 'calc(20% - 1.6rem)' }}
                >
                  <div className="text-neutral-400 text-lg italic">{item.number}</div>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mt-auto mb-8">
                    {item.title}
                  </p>

                  <div className="w-full h-[180px] overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative z-20 bg-[#f6f2ec] dark:bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <h2 className="text-4xl font-light text-neutral-800 dark:text-white">
                Можно ли разорвать эти циклы? Найти ответы? Почувствовать себя лучше?
                <br/><br/><br/>
                <span className="font-roslindale">Можно. Шаг за шагом.</span>
                <span className="text-amber-700/90 font-roslindale"> И я помогу.</span>
              </h2>
            </div>
            
            <div className="w-1/3">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-amber-700/20">
                <img 
                  src="/images/new.png" 
                  alt="Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-white dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
            <div className="mb-12">
              <h2 className="text-[#544B42] dark:text-white text-5xl font-light">
                Меня <span className="text-amber-700 font-roslindale">зовут</span>
              </h2>
              <h2 className="text-[#544B42] dark:text-white text-5xl font-light">
                Андрей Малик
              </h2>
            </div>

            <div className="space-y-12">
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
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="group"
                >
                  <h3 className="text-neutral-400 mb-4">{item.number}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="/images/ps.png"
              alt="Профессиональный портрет"
              loading="lazy"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 py-24 bg-white dark:bg-neutral-900">
        <div className="absolute top-0 left-0 right-0 h-[2px] mx-12">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-amber-700" />
                <div className="text-neutral-800 dark:text-white text-5xl font-light">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                
                {index < stats.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-36 bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] mx-12">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
        </div>
      </section>

      {/* Service Formats Section */}
      <section id="service-formats" className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-white dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="mb-24">
            <h2 className="text-neutral-800 dark:text-white text-5xl font-light mb-8">
              Форматы работы
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
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
                whileHover={{ y: -5 }}
                className="bg-[#f6f2ec] dark:bg-neutral-800 p-8 rounded-2xl"
              >
                <div className="text-amber-700 mb-6">
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl text-neutral-800 dark:text-white mb-4">{service.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {service.description}
                </p>
                <div className="flex justify-between items-center text-neutral-800 dark:text-white">
                  <span>{service.price}</span>
                  <span>{service.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
            <img
              src="/images/contacts.png"
              alt="Контактное изображение"
              loading="lazy"
              className="rounded-lg w-[85%] h-auto object-cover mt-24"
            />
            <p className="text-neutral-600 dark:text-neutral-400 mt-6 text-lg">
              Мы можем обсудить любой<br />
              вопрос, который волнует вас
            </p>
          </div>

          <div>
            <div className="mb-8 mt-[-150px]">
              <h2 className="text-[#544B42] dark:text-white text-5xl font-light mb-24">
                Начните новую жизнь<br />
                <span className="text-amber-700 font-roslindale">уже сегодня</span>
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-[#f6f2ec] dark:bg-neutral-900 border-t-[20px] border-neutral-100 dark:border-neutral-700 py-12">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-neutral-800 dark:text-white text-3xl">Андрей</span>
                  <span className="text-amber-700 text-3xl">Малик</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm tracking-wide">
                <button 
                  onClick={() => scrollToSection('requests')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
                >
                  ЗАПРОСЫ ДЛЯ РАБОТЫ
                </button>
                <button 
                  onClick={() => scrollToSection('skills')}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
>
  УСЛУГИ
</button>
<button 
  onClick={() => scrollToSection('about')}
  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
>
  ОБО МНЕ
</button>
<button 
  onClick={() => scrollToSection('contacts')}
  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors"
>
  КОНТАКТЫ
</button>
</div>

<button 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="p-4 rounded-full bg-amber-700 hover:bg-amber-800 transition-colors group"
>
  <ArrowUp 
    size={24} 
    className="text-white group-hover:-translate-y-1 transition-transform" 
  />
</button>
</div>

<div className="text-center">
  <a 
    href="tel:+97253861117" 
    className="text-4xl text-neutral-600 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors inline-block"
  >
    +972 (53) 861-1117
  </a>
</div>
</div>
</div>
</footer>
</div>
);
};

export default DesktopPage;