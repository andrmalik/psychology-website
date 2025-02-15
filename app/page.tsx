'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, ArrowUpRight, Moon, Sun, MessageCircle, Calendar, Star, Award, Users, BookOpen } from 'lucide-react';

export default function Page() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);  // стало
  const heroRef = useRef(null);
  

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Статистика
  const stats = [
    { icon: Users, value: '20+', label: 'довольных клиентов' },
    { icon: Star, value: '4.9', label: 'средняя оценка' },
    { icon: Award, value: '1', label: 'год практики' },
    { icon: BookOpen, value: '100+', label: 'часов консультаций' }
  ];

  const supportItems = [
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

  const testimonials = [
    {
      name: "Анна, 28 лет",
      text: "Спасибо за помощь в преодолении тревожности. Наши сессии действительно изменили мою жизнь к лучшему.",
      rating: 5,
      image: "/images/testimonial1.jpg"
    },
    {
      name: "Михаил, 32 года",
      text: "Профессиональный подход и внимательное отношение. Помогли разобраться с проблемами в отношениях.",
      rating: 5,
      image: "/images/testimonial2.jpg"
    },
    {
      name: "Елена, 25 лет",
      text: "Очень комфортная атмосфера на сессиях. Научилась лучше понимать себя и свои потребности.",
      rating: 5,
      image: "/images/testimonial3.jpg"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = container.offsetWidth / 3;
      const scrollAmount = itemWidth + 48;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`relative ${isDarkMode ? 'dark' : ''}`}>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="py-4 px-12 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
            <span className="text-amber-700 text-2xl">Малик</span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex gap-12 text-neutral-600 dark:text-neutral-400 text-sm tracking-wide">
              <a href="#requests" className="hover:text-neutral-900 dark:hover:text-white transition-colors">ЗАПРОСЫ ДЛЯ РАБОТЫ</a>
              <a href="#services" className="hover:text-neutral-900 dark:hover:text-white transition-colors">УСЛУГИ</a>
              <a href="#about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">ОБО МНЕ</a>
              <a href="#contacts" className="hover:text-neutral-900 dark:hover:text-white transition-colors">КОНТАКТЫ</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-amber-700/90 text-white rounded-full hover:bg-amber-800 transition-colors text-sm">
              ЗАКАЗАТЬ ЗВОНОК
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-6 py-2 bg-amber-700/90 text-white rounded-full hover:bg-amber-800 transition-colors text-sm flex items-center gap-2"
            >
              {isDarkMode ? (
                <>
                  <Sun size={18} />
                  <span></span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span></span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-end relative overflow-hidden pb-48">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 border-l-[3px] border-r-[3px] border-b-[3px] border-neutral-200 dark:border-neutral-800"
        >
          <img
            src="/images/background.png"
            alt="Professional portrait"
            className="w-full h-full object-cover"
          />
          <motion.div 
            style={{
              opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0])
            }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-12 ml-auto w-2/3 text-right">
          <div className="flex gap-4 mb-12 justify-end">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-6 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm tracking-wide text-white"
            >
              Индивидуальная терапия
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-6 py-2 bg-[#E1EAD7]/50 backdrop-blur-sm rounded-full text-sm tracking-wide text-white"
            >
              Онлайн и лично (в Израиле)
            </motion.span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-8xl text-white mb-6 font-extralight tracking-wide leading-tight"
          >
            Студент<br />Психолог
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-white/90 mb-12 tracking-wide ml-auto max-w-xl"
          >
            Терапия, вдохновленная мудростью и спокойствием Рима
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-end"
          >
            <button className="px-8 py-4 bg-white text-neutral-900 rounded-full flex items-center gap-3 hover:bg-neutral-100 transition-all text-sm tracking-wide group">
              Спланировать консультацию
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="services" className="min-h-screen flex items-center bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="text-center mb-24">
            <p className="text-neutral-400 text-sm mb-4 tracking-wide"></p>
            <h2 className="text-5xl font-light text-neutral-800 mb-2">
              Ценные навыки, которые
            </h2>
            <p className="text-3xl text-amber-700/90 italic">вы приобретёте</p>
          </div>
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-12 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl text-neutral-800 mb-6 font-light">Понимание себя и своих истинных желаний</h3>
              <p className="text-neutral-600 leading-relaxed">Глубокая работа над осознанием внутренних потребностей и желаний, помогает принять себя любым</p>
            </div>
            <div className="bg-white p-12 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl text-neutral-800 mb-6 font-light">Умение управлять стрессом и тревогой</h3>
              <p className="text-neutral-600 leading-relaxed">Освоение техник, которые улучшают качество жизни, помогают фокусировать внутреннее спокойствие</p>
            </div>
            <div className="bg-white p-12 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl text-neutral-800 mb-6 font-light">Стабильная и прочная внутренняя опора</h3>
              <p className="text-neutral-600 leading-relaxed">Помогает сохранять устойчивость и уверенность в любых жизненных ситуациях</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 px-32">
            <div className="bg-white p-12 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl text-neutral-800 mb-6 font-light">Принятие прошлого и отпускание обид</h3>
              <p className="text-neutral-600 leading-relaxed">Проработка прошлых травм и обид помогает освободиться от их влияния, вы начинаете жить в настоящем</p>
            </div>
            <div className="bg-white p-12 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl text-neutral-800 mb-6 font-light">Навыки адаптации к изменениям жизни</h3>
              <p className="text-neutral-600 leading-relaxed">Способность гибко реагировать на перемены, минимизируя стресс и сохраняя внутреннюю стабильность</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        className="py-24 bg-white dark:bg-neutral-900"
      >
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUpVariants}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-amber-700" />
                <div className="text-4xl font-bold mb-2 dark:text-white">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Support Section */}
      <section id="requests" className="min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="mb-24">
            <p className="text-neutral-400 text-sm mb-4 tracking-wide"></p>
            <div className="flex items-baseline gap-4">
              <h2 className="text-amber-700/90 text-5xl font-light italic">
                Поддержу
              </h2>
              <h2 className="text-neutral-800 dark:text-white text-5xl font-light">
                в решении трудностей
              </h2>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 mt-4">
              Мысли, которые разрушительно влияют на нас и окружение
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scroll('left')}
                className="p-4 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
              >
                <ArrowLeft size={24} className="text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors" />
              </button>
            </div>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="flex gap-12">
                {supportItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUpVariants}
                    className="w-[31%] flex-shrink-0 group"
                  >
                    <div className="text-neutral-400 mb-6 text-lg italic">{item.number}</div>
                    <div className="aspect-4/3 overflow-hidden rounded-lg mb-6">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scroll('right')}
                className="p-4 rounded-full bg-white dark:bg-neutral-800 shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
              >
                <ArrowRight size={24} className="text-neutral-400 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
            <p className="text-neutral-400 text-sm mb-8"></p>
            <div className="mb-12">
              <h2 className="text-neutral-800 dark:text-white text-5xl mb-2">Меня</h2>
              <h2 className="text-amber-700 text-5xl italic mb-2">зовут</h2>
              <h2 className="text-neutral-800 dark:text-white text-5xl">Андрей Малик</h2>
            </div>
            <div className="grid gap-12">
              <motion.div
                whileHover={{ x: 10 }}
                className="group"
              >
                <h3 className="text-neutral-400 mb-4">01</h3>
                <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                  Психолог-студент, Эмоционально-Образный терапевт, КПТ терапевт
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="group"
              >
                <h3 className="text-neutral-400 mb-4">02</h3>
                <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                  Обучалаюсь в МИП и в Институте ЭОТ
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="group"
              >
                <h3 className="text-neutral-400 mb-4">03</h3>
                <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                  Регулярно прохожу супервизию и личную терапию
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="group"
              >
                <h3 className="text-neutral-400 mb-4">04</h3>
                <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                  Моя миссия в работе — быть рядом и поддерживать вас на новом пути
                </p>
              </motion.div>
            </div>
          </div>
          <div>
            <img
              src="/images/ps.png"
              alt="Professional portrait"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        className="py-24 bg-[#f6f2ec] dark:bg-neutral-900"
      >
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-4xl text-center mb-12 text-neutral-800 dark:text-white">Отзывы клиентов</h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-neutral-800 dark:text-white">{testimonial.name}</div>
                    <div className="flex text-amber-700">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12">
          <div className="mb-24">
            <p className="text-neutral-400 text-sm mb-4 tracking-wide"></p>
            <h2 className="text-neutral-800 dark:text-white text-5xl font-light mb-8">
              Форматы работы
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl"
            >
              <div className="text-amber-700 mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl text-neutral-800 dark:text-white mb-4">Индивидуальная терапия</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Персональные сессии для глубокой проработки личных запросов и достижения ваших целей
              </p>
              <div className="flex justify-between items-center text-neutral-800 dark:text-white">
                <span>от 1000 рублей</span>
                <span>75 минут</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl"
            >
              <div className="text-amber-700 mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl text-neutral-800 dark:text-white mb-4">Онлайн консультация</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Удобный формат работы из любой точки мира через Zoom или другие платформы
              </p>
              <div className="flex justify-between items-center text-neutral-800 dark:text-white">
                <span>от 500 рублей</span>
                <span>75 минут</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-2xl"
            >
              <div className="text-amber-700 mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl text-neutral-800 dark:text-white mb-4">Пробная встреча</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Знакомство и обсуждение запроса для определения формата дальнейшей работы
              </p>
              <div className="flex justify-between items-center text-neutral-800 dark:text-white">
                <span>Бесплатно</span>
                <span>30 минут</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
            <img 
              src="/images/contacts.png" 
              alt="White fabric" 
              className="rounded-lg w-full h-auto object-cover"
            />
            <p className="text-neutral-600 dark:text-neutral-400 mt-6 text-lg">
              Мы можем обсудить любой вопрос, который волнует вас
            </p>
          </div>
          <div>
            <h2 className="text-neutral-800 dark:text-white text-3xl mb-4">
              Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
            </h2>
            <form className="space-y-6 mt-12">
              <input 
                type="text" 
                placeholder="Имя" 
                className="w-full p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white"
              />
              <input 
                type="tel" 
                placeholder="+7 (___) ___-__-__" 
                className="w-full p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white"
              />
              <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <input type="checkbox" className="rounded" />
                Даю согласие на обработку персональных данных
              </label>
              <button type="submit" className="w-full py-6 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm tracking-wide">
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f6f2ec] dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
              <span className="text-amber-700 text-2xl">Малик</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.button>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col gap-2 justify-center">
              <a href="tel:+79884068983" className="text-4xl text-neutral-800 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors">
                Телеграм, WhatsApp: +7 (988) 406-89-83
              </a>
              <a href="tel:+97253861117" className="text-4xl text-neutral-800 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors">
                +972 (53) 861-1117
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

