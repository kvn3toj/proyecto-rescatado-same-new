'use client';

import { useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { motion } from 'framer-motion';

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

const AreaCard = ({ title, description, icon, index }: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) => (
  <motion.div
    className="bg-tvam-black border border-tvam-blue/30 rounded-lg p-8 hover:border-tvam-blue transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 * index }}
    whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(60, 113, 210, 0.2)' }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-tvam-blue">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const LoginForm = ({ onLogin }: { onLogin: (success: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production this would be more secure
    if (username === 'humblebeast' && password === 'nostradamus2025') {
      onLogin(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
      onLogin(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-tvam-black border border-tvam-blue/30 rounded-lg p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-tvam-blue">Acceso Restringido</h2>
      <p className="text-gray-300 mb-6 text-center">
        El acceso a la página 2 solo puede ser a través de usuario y clave
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-tvam-darkblack border border-gray-600 rounded-lg text-white focus:outline-none focus:border-tvam-blue"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-tvam-darkblack border border-gray-600 rounded-lg text-white focus:outline-none focus:border-tvam-blue"
            required
          />
        </div>
        
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
        
        <motion.button
          type="submit"
          className="w-full bg-tvam-blue hover:bg-tvam-blue/80 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ACCEDER A LA ACADEMIA
        </motion.button>
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Pista: usuario = humblebeast, contraseña = nostradamus2025
      </p>
    </motion.div>
  );
};

export default function Academia() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const areas = [
    {
      title: 'Mente y Emociones',
      description: 'Desarrolla la psicología del trading. Aprende a controlar el miedo, la codicia y las emociones que sabotean tus operaciones. Construye la mentalidad de un trader ganador.',
      icon: '🧠'
    },
    {
      title: 'Estrategia y Análisis',
      description: 'Domina las técnicas avanzadas de análisis técnico y fundamental. Desarrolla estrategias probadas y aprende a leer los mercados como un profesional.',
      icon: '📈'
    },
    {
      title: 'Entorno y Hábitos',
      description: 'Crea rutinas y disciplina que te lleven al éxito. Optimiza tu espacio de trabajo, gestiona el riesgo y desarrolla hábitos que sostengan tu crecimiento a largo plazo.',
      icon: '⚡'
    }
  ];

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="bg-tvam-darkblack text-white min-h-screen py-16 flex items-center">
          <div className="tvam-container">
            <LoginForm onLogin={setIsAuthenticated} />
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-tvam-darkblack text-white min-h-screen py-16">
        <div className="tvam-container">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              variants={fadeUp}
              custom={1}
            >
              ACADEMIA PARA <span className="text-tvam-blue">TRADERS</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              variants={fadeUp}
              custom={2}
            >
              Bienvenido a la transformación completa. Aquí no solo aprendes a operar, 
              te conviertes en un trader de élite.
            </motion.p>

            <motion.div
              className="bg-tvam-blue/10 border border-tvam-blue/30 rounded-lg p-6 max-w-2xl mx-auto"
              variants={fadeUp}
              custom={3}
            >
              <p className="text-lg">
                <strong>¡Acceso Concedido!</strong> Bienvenido a la academia exclusiva para traders comprometidos 
                con su crecimiento personal y profesional.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Las 3 Áreas del Desarrollo como Trader
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {areas.map((area, index) => (
                <AreaCard key={area.title} {...area} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center bg-tvam-black rounded-lg p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
          >
            <h3 className="text-2xl font-bold mb-4">¡Estás dentro del círculo interno!</h3>
            <p className="text-lg mb-6">
              Ahora tienes acceso completo a todos los recursos, estrategias y herramientas 
              que necesitas para convertirte en un trader exitoso.
            </p>
            
            <motion.button
              className="bg-tvam-blue hover:bg-tvam-blue/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMENZAR ENTRENAMIENTO
            </motion.button>
            
            <motion.button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CERRAR SESIÓN
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 