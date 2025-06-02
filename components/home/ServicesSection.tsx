'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useState } from 'react';

const ServiceCard = ({
  title,
  subtitle,
  imageSrc,
  buttonLink,
  index
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  buttonLink: string;
  index: number;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: 0.1 + 0.15 * index, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 24px #3c71d289' }}
    >
      <div className="relative h-[300px] mb-4 overflow-hidden rounded-lg group">
        {!imageError && imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-tvam-blue/20 to-tvam-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tvam-blue/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-tvam-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">{title}</p>
            </div>
          </div>
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        />
      </div>
      <motion.h3
        className="text-xl font-bold mb-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.18 * index, duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-300 mb-4 text-sm"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.24 * index, duration: 0.3 }}
      >
        {subtitle}
      </motion.p>

      <Button href={buttonLink} size="sm" variant="primary">
        Más Información
      </Button>
    </motion.div>
  );
};

const serviceCards = [
  {
    title: 'Mente y Emociones',
    subtitle: 'Psicología del trading y control emocional',
    imageSrc: '/images/mente.jpg',
    buttonLink: '/escuela',
  },
  {
    title: 'Estrategia y Análisis',
    subtitle: 'Técnicas avanzadas y análisis de mercado',
    imageSrc: '/images/relaciones.jpg',
    buttonLink: '/eventos',
  },
  {
    title: 'Entorno y Hábitos',
    subtitle: 'Rutinas y disciplina para traders exitosos',
    imageSrc: '/images/trabajo.jpg',
    buttonLink: '/conferencias',
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-tvam-black text-white py-16" id="productos">
      <div className="tvam-container">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, letterSpacing: '-0.05em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.04em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          ¿Cómo comparto <span className="text-tvam-blue">lo que soy</span>?
        </motion.h2>

        <motion.p
          className="text-center text-lg mb-12"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A través de eventos, cursos en línea y mis conferencias en vivo
        </motion.p>

        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-8 text-center text-tvam-blue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Academia para Traders
        </motion.h3>

        <motion.p
          className="text-center text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          3 Áreas del desarrollo como Trader
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((props, i) => (
            <ServiceCard key={props.title} {...props} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 