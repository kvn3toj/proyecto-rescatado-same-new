'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Button from '../ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full h-screen bg-tvam-black text-white overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <Image
          src="/images/quien-soy.jpeg"
          alt="Sebastian García - Humble Beast"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full tvam-container">
        <motion.h1
          className="text-5xl md:text-7xl font-bold uppercase mb-4"
          variants={fadeUp}
          custom={1}
        >
          HUMBLE BEAST
        </motion.h1>

        <div className="max-w-2xl">
          <motion.p
            className="text-lg md:text-xl mb-6"
            variants={fadeUp}
            custom={2}
          >
            Una membresía diseñada para empujarte y crecer como trader y ser humano.
          </motion.p>
          <motion.p
            className="text-lg mb-6"
            variants={fadeUp}
            custom={3}
          >
            Aquí no solo operamos, nos transformamos.
          </motion.p>
          <motion.p
            className="text-lg mb-8 text-tvam-blue font-semibold"
            variants={fadeUp}
            custom={4}
          >
            🔥 Entrena las 7 áreas clave de tu vida:<br />
            Cuerpo. Mente. Relaciones. Trabajo. Productividad. Dinero. Legado.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={5}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button href="/sign-up" size="lg">
              ENTRARLE
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 