'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, ArrowUpRight, Moon, Sun, MessageCircle, Calendar, Star, Award, Users, BookOpen } from 'lucide-react';
import _ from 'lodash';

// Типы
interface SupportItem {
  number: string;
  title: string;
  image: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  image: string;
}

interface FormData {
  name: string;
  phone: string;
  agreement: boolean;
}

interface FormErrors {
  name: string;
  phone: string;
  agreement: string;
}

function Page() {
  // Состояния
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    agreement: false
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    phone: '',
    agreement: ''
  });

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Данные
  const stats = [
    { icon: Users, value: '20+', label: 'довольных клиентов' },
    { icon: Star, value: '4.9', label: 'средняя оценка' },
    { icon: Award, value: '1', label: 'год практики' },
    { icon: BookOpen, value: '100+', label: 'часов консультаций' }
  ];

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

  const testimonials: Testimonial[] = [
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

  // Validation
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      name: '',
      phone: '',
      agreement: ''
    };

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

    setFormErrors(newErrors);
    return isValid;
  };

  // Handlers
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Здесь будет логика отправки формы
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  };
  const scrollToSection = useCallback((elementId: string): void => {
    const element = document.getElementById(elementId);
    if (!element) return;
  
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'  // Только это свойство доступно
    });
  }, []);

  const handleNavClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ): void => {
    e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  const scroll = useCallback((direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = container.offsetWidth / 3;
    const scrollAmount = itemWidth + 48;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  // Theme handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Scroll observer
  const handleScroll = useCallback(
    _.debounce(() => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    }, 100),
    [lastScrollY]
  );

  // Active section observer
  useEffect(() => {
    const handleSectionVisibility = _.debounce(() => {
      const sections = ['requests', 'skills', 'about', 'contacts', 'service-formats'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const offset = 100;

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(sectionId);
          break;
        }
      }
    }, 100);

    window.addEventListener('scroll', handleSectionVisibility);
    return () => {
      handleSectionVisibility.cancel();
      window.removeEventListener('scroll', handleSectionVisibility);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getLinkClassName = (sectionId: string): string => `
    relative py-1
    hover:text-neutral-900 dark:hover:text-white transition-colors
    ${activeSection === sectionId ? 'text-amber-700 dark:text-amber-700' : 'text-neutral-600 dark:text-neutral-400'}
  `;

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
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className={`fixed w-full z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 transition-all duration-300 ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Progress indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-amber-700 origin-[0%]"
          style={{ scaleX }}
          aria-hidden="true"
        />

        <div className="py-4 px-12 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
            <span className="text-amber-700 text-2xl">Малик</span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex gap-12 text-sm tracking-wide">
              <a
                href="#requests"
                onClick={(e) => handleNavClick(e, 'requests')}
                className={getLinkClassName('requests')}
                aria-current={activeSection === 'requests' ? 'page' : undefined}
              >
                {activeSection === 'requests' && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                ЗАПРОСЫ ДЛЯ РАБОТЫ
              </a>
              <a
                href="#skills"
                onClick={(e) => handleNavClick(e, 'skills')}
                className={getLinkClassName('skills')}
                aria-current={activeSection === 'skills' ? 'page' : undefined}
              >
                {activeSection === 'skills' && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                УСЛУГИ
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={getLinkClassName('about')}
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                {activeSection === 'about' && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                ОБО МНЕ
              </a>
              <a
                href="#contacts"
                onClick={(e) => handleNavClick(e, 'contacts')}
                className={getLinkClassName('contacts')}
                aria-current={activeSection === 'contacts' ? 'page' : undefined}
              >
                {activeSection === 'contacts' && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-700"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                КОНТАКТЫ
              </a>
            </div>
          </div>
            <div className="flex items-center gap-8 ml-auto"> {/* Добавлен ml-auto для крайнего правого положения */}
  <button 
    onClick={() => scrollToSection('contacts')}
    className="text-neutral-800 dark:text-white text-sm hover:text-amber-700 dark:hover:text-amber-700 transition-colors mr-8"
    aria-label="Заказать звонок"
  >
    ЗАКАЗАТЬ ЗВОНОК
  </button>
  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="text-neutral-800 dark:text-white text-sm hover:text-amber-700 dark:hover:text-amber-700 transition-colors flex items-center gap-2"
    aria-label={isDarkMode ? "Включить светлую тему" : "Включить тёмную тему"}
  >
    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
  </button>
</div>
        </div>
      </nav>
      <section 
  ref={heroRef} 
  className="relative min-h-screen w-full flex items-end bg-[#f6f2ec]"
>
  <motion.div 
    style={{ y }}
    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
  >
    <img
      src="/images/background.png"
      alt="Professional portrait"
      className="w-full h-full object-cover object-center"
      priority
    />
    <div className="absolute inset-0 bg-black/30" />
  </motion.div>

  <div className="relative z-10 max-w-7xl mx-auto px-12 w-2/3 text-right pb-48 ml-auto mr-[-200px]"> {/* Изменены отступы */}
  <div className="flex gap-4 mb-12 justify-end"> {/* justify-end оставляем */}
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
    className="text-8xl text-white mb-2 font-extralight tracking-wide whitespace-nowrap"
  >
    Студент Психолог
  </motion.h1>

  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="text-8xl text-white mb-6 tracking-wide whitespace-nowrap"
  >
    <span className="font-roslindale">Андрей</span>&nbsp;Малик
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
    <button 
      className="px-8 py-4 bg-white text-neutral-900 rounded-full flex items-center gap-3 hover:bg-neutral-100 transition-all text-sm tracking-wide group"
      onClick={() => scrollToSection('contacts')}
      aria-label="Спланировать консультацию"
    >
      Спланировать консультацию
      <ArrowUpRight 
        size={18} 
        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
        aria-hidden="true"
      />
      </button>
    </motion.div>
  </div>
</section>

      {/* Skills Section */}
      <section 
  id="skills" 
  className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"

        aria-label="Навыки и услуги"
      >
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
                key={`skill-${index}`}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 p-12 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl text-neutral-800 dark:text-white mb-6 font-light">{skill.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{skill.description}</p>
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
                key={`additional-skill-${index}`}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 p-12 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl text-neutral-800 dark:text-white mb-6 font-light">{skill.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        className="scroll-mt-[80px] relative z-20 py-24 bg-white dark:bg-neutral-900"
        aria-label="Статистика"
      >
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={`stat-${stat.value}-${index}`}
                variants={fadeInUpVariants}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-amber-700" aria-hidden="true" />
                <div className="text-4xl font-bold mb-2 dark:text-white">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

{/* Support Section */}
<section 
  id="requests" 
  className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
  aria-label="Поддержка"
>
  <div className="max-w-7xl mx-auto px-12">
    <div className="flex justify-between items-center mb-32">
      <div>
      <div className="flex items-baseline gap-4">
  <h2 className="text-amber-700/90 text-5xl font-light font-roslindale">
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

      {/* Кнопки навигации перемещены сюда */}
      <div className="flex gap-4">
        <button 
          onClick={() => scroll('left')}
          className="p-4 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
          aria-label="Прокрутить влево"
        >
          <ArrowLeft 
            size={24} 
            className="text-amber-700 transition-colors"
            aria-hidden="true"
          />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="p-4 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
          aria-label="Прокрутить вправо"
        >
          <ArrowRight 
            size={24} 
            className="text-amber-700 transition-colors"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <div 
      ref={scrollContainerRef}
      className="flex overflow-x-auto hide-scrollbar gap-8"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {supportItems.slice(0, 4).map((item, index) => (
        <motion.div 
          key={`support-${index}`}
          variants={fadeInUpVariants}
          className="min-w-[280px] h-[400px] flex-shrink-0 bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700 flex flex-col"
          style={{ width: 'calc(22% - 1rem)' }} // Примерно 4.5 блока будут видны
        >
          <div className="text-neutral-400 text-lg italic mb-auto">{item.number}</div>
          
          <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-8">
            {item.title}
          </p>

          <div className="w-full h-[120px] overflow-hidden rounded-lg mt-auto">
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
</section>
      {/* About Section */}
      <section 
        id="about" 
        className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
        aria-label="Обо мне"
      >
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
          <div className="mb-12">
  <h2 className="text-[#544B42] dark:text-white text-5xl font-light">Меня</h2>
  <h2 className="text-amber-700 text-5xl font-roslindale mb-2">зовут</h2>
  <h2 className="text-[#544B42] dark:text-white text-5xl font-light">Андрей Малик</h2>
</div>
            
            <div className="grid gap-12">
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
                  key={`about-${index}`}
                  whileHover={{ x: 10 }}
                  className="group"
                >
                  <h3 className="text-neutral-400 mb-4" aria-hidden="true">{item.number}</h3>
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

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        className="scroll-mt-[80px] relative z-20 py-24 bg-[#f6f2ec] dark:bg-neutral-900"
        aria-label="Отзывы"
      >
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-4xl text-center mb-12 text-neutral-800 dark:text-white">Отзывы клиентов</h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`testimonial-${index}`}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={`Фото ${testimonial.name}`}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-neutral-800 dark:text-white">{testimonial.name}</div>
                    <div 
                      className="flex text-amber-700" 
                      aria-label={`Оценка: ${testimonial.rating} из 5`}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
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

      {/* Service Formats Section */}
      <section 
        id="service-formats" 
        className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
        aria-label="Форматы работы"
      >
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
                key={`service-${index}`}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 p-8 rounded-2xl"
              >
                <div className="text-amber-700 mb-6">
                  <service.icon size={32} aria-hidden="true" />
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
{/* Contact Section */}
<section 
  id="contacts" 
  className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
  aria-label="Контакты"
>
  <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
    <div>
      <img 
        src="/images/contacts.png" 
        alt="Контактное изображение" 
        loading="lazy"
        className="rounded-lg w-full h-auto object-cover"
      />
      <p className="text-neutral-600 dark:text-neutral-400 mt-6 text-lg">
        Мы можем обсудить любой вопрос, который волнует вас
      </p>
    </div>
    <div>
    <div className="mb-32 mt-[-100px]">
  <h2 className="text-[#544B42] dark:text-white text-5xl font-light">
    Начните новую жизнь<br />
    <span className="text-amber-700 font-roslindale">уже сегодня</span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
        </p>
      </div>
      <form 
        onSubmit={handleFormSubmit}
        className="space-y-6 mt-12"
        aria-label="Форма обратной связи"
      >
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Имя" 
                  className="w-full p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white"
                  aria-label="Ваше имя"
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                />
                {formErrors.name && (
                  <p className="text-red-500 mt-1 text-sm" role="alert">{formErrors.name}</p>
                )}
              </div>

              <div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__" 
                  className="w-full p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all dark:bg-neutral-800 dark:text-white"
                  aria-label="Ваш телефон"
                  aria-required="true"
                  aria-invalid={!!formErrors.phone}
                />
                {formErrors.phone && (
                  <p className="text-red-500 mt-1 text-sm" role="alert">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <input 
                    type="checkbox" 
                    name="agreement"
                    checked={formData.agreement}
                    onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                    className="rounded"
                    aria-label="Согласие на обработку персональных данных"
                  />
                  Даю согласие на обработку персональных данных
                </label>
                {formErrors.agreement && (
                  <p className="text-red-500 mt-1 text-sm" role="alert">{formErrors.agreement}</p>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full py-6 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.agreement}
              >
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="relative z-20 bg-[#f6f2ec] dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-12"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <span className="text-neutral-800 dark:text-white text-2xl">Андрей</span>
              <span className="text-amber-700 text-2xl">Малик</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849
                  0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </div>
          </div>
          <div className="text-center">
            <div className="flex flex-col gap-2 justify-center">
              <a 
                href="tel:+79884068983" 
                className="text-4xl text-neutral-800 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors"
                aria-label="Телефон для России"
              >
                Телеграм, WhatsApp: +7 (988) 406-89-83
              </a>
              <a 
                href="tel:+97253861117" 
                className="text-4xl text-neutral-800 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors"
                aria-label="Телефон для Израиля"
              >
                +972 (53) 861-1117
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;