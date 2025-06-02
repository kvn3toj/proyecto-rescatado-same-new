'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    text: 'El contenido de Diego me ayudó a dejar de postergar mi vida y atreverme a hacer cambios que temía.',
    name: 'Laura Jiménez',
    role: 'Emprendedora',
    image: '/images/quien-soy.jpeg',
  },
  {
    text: 'Pensaba que todo esto era pura motivación… Hasta que lo probé y mi mentalidad cambió.',
    name: 'Mario González',
    role: 'Programador',
    image: '/images/relaciones.jpg',
  },
  {
    text: 'Las preguntas que hace te provocan en serio. No buscas sentirte bien: buscas crecer.',
    name: 'Karen Ruiz',
    role: 'Diseñadora',
    image: '/images/mente.jpg',
  },
  {
    text: 'Sigo leyendo los emails pendejos porque uno que otro sí me ha movido el tapete.',
    name: 'Jorge Martínez',
    role: 'Estudiante',
    image: '/images/trabajo.jpg',
  },
];

const variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay transition
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIndex(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);

  const goTo = (i: number) => {
    setIndex(i);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleImageError = (testimonialIndex: number) => {
    setImageErrors(prev => ({ ...prev, [testimonialIndex]: true }));
  };

  return (
    <section className="bg-tvam-darkblack py-16 relative z-20 select-none">
      <div className="tvam-container max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Testimonios
        </h2>
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, type: 'spring' }}
              className="rounded-lg px-6 py-8 shadow-lg bg-tvam-black flex flex-col items-center text-center"
            >
              {testimonials[index].image && !imageErrors[index] ? (
                <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-2 border-tvam-blue">
                  <Image
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    width={64} 
                    height={64}
                    className="object-cover"
                    onError={() => handleImageError(index)}
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mb-4 rounded-full border-2 border-tvam-blue bg-tvam-blue/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-tvam-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <p className="text-xl italic mb-6 leading-snug">
                "{testimonials[index].text}"
              </p>
              <div>
                <span className="font-bold text-tvam-blue block">{testimonials[index].name}</span>
                <span className="text-sm text-gray-400 block">{testimonials[index].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Controls */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full mx-1 bg-tvam-blue transition-opacity ${i === index ? 'opacity-100' : 'opacity-40'}`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
