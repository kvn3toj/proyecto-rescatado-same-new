'use client';

import { useState } from 'react';
import Button from './Button';

interface EmailSubscribeProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const EmailSubscribe = ({ 
  title = "Suscríbete", 
  subtitle = "Recibe nuestras actualizaciones", 
  buttonText = "Suscribirse" 
}: EmailSubscribeProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('¡Gracias por suscribirte! Revisa tu email.');
      setEmail('');
      setName('');
    } catch (error) {
      setMessage('Error al suscribirse. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      {subtitle && <p className="text-gray-300 mb-4">{subtitle}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="tvam-input"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tvam-input"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Enviando...' : buttonText}
        </Button>
        
        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EmailSubscribe; 