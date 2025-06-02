'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AreaSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

const AreaSection = ({ title, subtitle, description, imageSrc, reverse = false }: AreaSectionProps) => {
  return (
    <motion.div
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 mb-16 md:mb-24`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          {title}
        </h3>
        {subtitle && (
          <h4 className="text-xl md:text-2xl font-normal mb-4 text-gray-300">
            {subtitle}
          </h4>
        )}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default AreaSection; 