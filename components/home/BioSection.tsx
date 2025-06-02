'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const ListItem = ({ children, index }: { children: React.ReactNode; index: number; }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <motion.li
      ref={ref}
      className="flex items-start"
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
    >
      <motion.svg
        className="w-6 h-6 text-tvam-blue mr-3 mt-1 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.2, color: '#ffffff', transition: { duration: 0.2 } }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </motion.svg>
      <span>{children}</span>
    </motion.li>
  );
};

const BioSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.22 });
  return (
    <section ref={sectionRef} className="bg-tvam-black text-white py-16 relative overflow-hidden" id="quien-soy">
      <div className="tvam-container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="md:w-1/2">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
            >
              Put* el que no lea quién soy
            </motion.h2>

            <motion.ul className="space-y-6" variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              <ListItem index={2}>Escribí lo de arriba solo para picar tu ego.</ListItem>
              <ListItem index={3}>Porque no creo que tenga que hacer algo para que tú te sientas respetado. ¡Diviértete!</ListItem>
              <ListItem index={4}>No me gusta describirme porque no creo en las etiquetas.</ListItem>
              <ListItem index={5}>Me llaman Diego pero yo me llamo Huracán a memesmooo.</ListItem>
              <ListItem index={6}>Estoy aquí porque alguien cogió y llegué.</ListItem>
              <ListItem index={7}>Nunca descubrí quién soy. Lo decidí.</ListItem>
            </motion.ul>
          </div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] group">
              {/* Real image */}
              <Image
                src="/images/quien-soy.jpeg"
                alt="Diego Dreyfus"
                fill
                className="object-cover object-center rounded-lg"
              />
              
              {/* Overlay sutil */}
              <motion.div className="absolute inset-0 bg-gradient-to-b from-tvam-blue/25 to-black/35 opacity-40 rounded-lg" />
              
              {/* Animated quote */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <p className="text-lg italic font-medium text-white">"La vida no tiene sentido, le das tú el sentido."</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BioSection; 