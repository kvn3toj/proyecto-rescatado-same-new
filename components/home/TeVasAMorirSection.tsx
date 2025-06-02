'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.10 * i,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const TeVasAMorirSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['LISTO', 'PREPARADO', 'DECIDIDO', 'COMPROMETIDO'];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);
  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  const glitchVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.03 * i + 0.2,
        duration: 0.5
      }
    })
  };
  const titleText = 'HUMBLE BEAST';
  const titleChars = titleText.split('');
  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full bg-tvam-black text-white py-16 md:py-24"
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/quien-soy.jpeg"
          alt="Sebastian García - Trading"
          fill
          className="object-cover object-top"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="relative z-10 tvam-container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Título animado tipo glitch, fadeUp(1) */}
          <motion.div className="mb-4 overflow-hidden flex justify-center" variants={fadeUp} custom={1}>
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={glitchVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                className="text-4xl md:text-6xl font-bold uppercase inline-block"
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
          {/* Rotativo */}
          <motion.div
            className="relative h-16 mb-8"
            variants={fadeUp}
            custom={2}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentWord}
                className="text-xl md:text-2xl absolute inset-0 flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                ¿Estás <span className="text-tvam-blue">{words[currentWord]}</span> o quieres seguir de mediocre?
              </motion.h2>
            </AnimatePresence>
          </motion.div>
          {/* Texto filosófico */}
          <motion.p
            className="text-lg mb-8"
            variants={fadeUp}
            custom={3}
          >
            Soy <strong>Sebastian García</strong> y no busco cambiar tu vida.<br />
            Me dedico a crecer y si quieres usar mi proceso para inspirarte, que chimba.
          </motion.p>
          {/* Botón */}
          <motion.div
            variants={fadeUp}
            custom={4}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button href="#productos" variant="primary" size="lg">
              Quiero Inspirarme
            </Button>
          </motion.div>
          {/* Animated skull, aparece últimos */}
          <motion.div
            className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2"
            variants={fadeUp}
            custom={5}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0, rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 0.7, delay: 1.2, rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <Image src="/images/skull-logo.svg" alt="Skull" width={60} height={60} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TeVasAMorirSection;
