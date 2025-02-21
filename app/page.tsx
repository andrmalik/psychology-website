'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowUp, Moon, Sun, MessageCircle, Calendar, Star, Award, Users, Brain, BookOpen, Monitor, Heart } from 'lucide-react';import _ from 'lodash';
import ContactForm from './components/ContactForm';

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
    if (!element) {
      console.warn(`Element with id ${elementId} not found`);
      return;
    }
  
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
    animate(window.scrollY, offsetPosition, {
      duration: 1.5,
      ease: [0.32, 0.72, 0, 1], // custom bezier curve
      onUpdate: (value) => window.scrollTo(0, value)
    });
  }, []);
  
  // Для ссылок с href
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
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


  const containerVariants = {
    hidden: {},
    visible: (custom) => ({
      transition: {
        staggerChildren: 0.5,
        delayChildren: custom * 8
      }
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const problemsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 1.2,
        delayChildren: 2
      }
    }
  };

  const problemVariants = {
    hidden: { 
      opacity: 0,
      width: "0%"
    },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  // Categories data for Problems section
  const categories = [
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
        html {
          scroll-behavior: smooth;
          transition: scroll-position 2s cubic-bezier(0.4, 0, 0.2, 1);
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
  className="relative min-h-screen w-full flex items-end bg-[#f6f2ec] overflow-x-hidden" // добавлен overflow-x-hidden
>
  <motion.div 
    style={{ y }}
    className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
  >
    <img
      src="/images/background.png"
      alt="Professional portrait"
      className="w-full h-full object-cover object-center"
      priority="true"
    />
    <div className="absolute inset-0 bg-black/30" />
  </motion.div>

  <div className="relative z-10 max-w-7xl mx-auto px-12 w-1/2 text-right pb-48 ml-auto translate-x-[360px]">
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
  className="text-7xl text-white mb-2 font-extralight tracking-wide whitespace-nowrap"
>
  Студент Психолог
</motion.h1>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="text-8xl text-white mb-6 tracking-wide whitespace-nowrap"
    >
      <span className="font-roslindale">Андрей</span>&nbsp;
      <span className="font-extralight">Малик</span>
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


      {/* Problems Section */}
      <section className="relative z-20 min-h-screen flex items-end bg-[#f6f2ec] dark:bg-neutral-900 py-24"> {/* Changed items-center to items-end */}
      <div className="max-w-7xl mx-auto px-12 mb-7"> {/* Added mb-32 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-8"
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
                custom={index}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} ${category.darkGradient} p-8 rounded-2xl border ${category.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <motion.div 
                  variants={titleVariants}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className={`p-3 rounded-xl bg-white/80 dark:bg-neutral-800/80 ${category.borderColor}`}>
                    <category.icon size={24} className={category.iconColor} />
                  </div>
                  <h3 className="text-xl text-[#544B42] dark:text-white font-light">
                    {category.title}
                  </h3>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  variants={problemsContainerVariants}
                >
                  {category.problems.map((problem, pIndex) => (
                    <motion.div
                      key={pIndex}
                      variants={problemVariants}
                      className="overflow-hidden"
                    >
                      <div className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-neutral-800/50 transition-all duration-300">
                        <div className={`w-2 h-2 mt-2 rounded-full bg-opacity-30 ${category.iconColor} group-hover:scale-110 transition-all duration-300`} />
                        <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-white transition-colors italic whitespace-nowrap">
                          {problem}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
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
          <br/><br/><br/> {/* Added two extra line breaks */}
          <span className="font-roslindale">Можно. Шаг за шагом.</span> {/* Added Roslindale but kept original color */}
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

{/* Support Section */}
<section 
  id="requests" 
  className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
  aria-label="Поддержка"
>
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
        Мысли, которые разрушительно влияют на нас<br/> и окружение
      </p>
    </div>

    <div className="relative">
      <div className="absolute -top-20 left-0 flex gap-3">
        <button 
          onClick={() => scroll('left')}
          className="p-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
          aria-label="Прокрутить влево"
        >
          <ArrowLeft 
            size={20} 
            className="text-amber-700 transition-colors"
            aria-hidden="true"
          />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="p-3 rounded-full bg-white dark:bg-neutral-800 border-2 border-amber-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
          aria-label="Прокрутить вправо"
        >
          <ArrowRight 
            size={20} 
            className="text-amber-700 transition-colors"
            aria-hidden="true"
          />
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-8 pr-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {supportItems.map((item, index) => (
          <motion.div 
            key={`support-${index}`}
            variants={fadeInUpVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
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

{/* About Section */}
<section 
        id="about" 
        className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center  bg-white dark:bg-neutral-900 py-24"
        aria-label="Обо мне"
      >
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
          <div>
          <div className="mb-12">
          <h2 className="text-[#544B42] dark:text-white text-5xl font-light inline-block">Меня </h2>{" "}
<h2 className="text-amber-700 text-5xl font-roslindale mb-2 inline-block"> зовут</h2>
<h2 className="text-[#544B42] dark:text-white text-5xl font-light block">Андрей Малик</h2>
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


      {/* Statistics Section */}
<section 
  className="scroll-mt-[80px] relative z-20 py-24 bg-[#f6f2ec] dark:bg-neutral-900"
  aria-label="Статистика"
>
  <div className="max-w-7xl mx-auto px-12">
    <div className="grid grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div 
          key={`stat-${stat.value}-${index}`}
          className="text-center"
        >
          <stat.icon className="w-12 h-12 mx-auto mb-4 text-amber-700" aria-hidden="true" />
          <div className="text-neutral-800 dark:text-white text-5xl font-light">{stat.value}</div>
          <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
  </section>


      {/* Service Formats Section */}
      <section 
        id="service-formats" 
        className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-white dark:bg-neutral-900 py-24"
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
                className="bg-[#f6f2ec] dark:bg-neutral-800 p-8 rounded-2xl"
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

      <section 
  id="contacts"
  className="scroll-mt-[80px] relative z-20 min-h-screen flex items-center bg-[#f6f2ec] dark:bg-neutral-900 py-24"
  aria-label="Контакты"
>
  <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-24">
    {/* Левая колонка */}
    <div>
      <img
        src="/images/contacts.png"
        alt="Контактное изображение"
        loading="lazy"
        className="rounded-lg w-[85%] h-auto object-cover mt-24" // Было w-[70%], добавили mt-24
        />
      <p className="text-neutral-600 dark:text-neutral-400 mt-6 text-lg">
        Мы можем обсудить любой<br />
        вопрос, который волнует вас
      </p>
    </div>

    {/* Правая колонка */}
    <div>
      {/* Заголовок и описание */}
      <div className="mb-8 mt-[-150px]"> {/* Было mb-32 */}
      <h2 className="text-[#544B42] dark:text-white text-5xl font-light mb-24">
          Начните новую жизнь<br />
          <span className="text-amber-700 font-roslindale">уже сегодня</span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          Решиться на изменения сложно, но вы здесь, а значит первый шаг уже сделан
        </p>
      </div>
      {/* Форма */}
      <ContactForm />
    </div>
  </div>
</section>


      <footer 
      className="relative z-20 bg-[#f6f2ec] dark:bg-neutral-900 border-t-[20px] border-neutral-100 dark:border-neutral-700 py-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col">
          {/* Top section with brand and navigation */}
          <div className="flex justify-between items-start mb-12">
            {/* Left - Brand section */}
            <div className="flex flex-col items-start">
              {/* Brand name */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-neutral-800 dark:text-white text-3xl">Андрей</span>
                <span className="text-amber-700 text-3xl">Малик</span>
              </div>

              {/* Tagline */}
              <p className="text-neutral-600 dark:text-neutral-400">Место для безопасного диалога</p>
            </div>

            {/* Center - Navigation links in 2 columns */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm tracking-wide">
              <a href="#requests" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">
                ЗАПРОСЫ ДЛЯ РАБОТЫ
              </a>
              <a href="#skills" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">
                УСЛУГИ
              </a>
              <a href="#about" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">
                ОБО МНЕ
              </a>
              <a href="#contacts" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white transition-colors">
                КОНТАКТЫ
              </a>
            </div>

            {/* Right - Scroll to top button */}
            <button 
              onClick={() => scrollToSection('skills')}
              className="p-4 rounded-full bg-amber-700 hover:bg-amber-800 transition-colors group"
              aria-label="Перейти к услугам"
            >
              <ArrowUp 
                size={24} 
                className="text-white group-hover:-translate-y-1 transition-transform" 
              />
            </button>
          </div>

          {/* Bottom section - Centered phone number */}
          <div className="text-center">
            <a 
              href="tel:+97253861117" 
              className="text-4xl text-neutral-600 dark:text-white hover:text-amber-700 dark:hover:text-amber-700 transition-colors inline-block"
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