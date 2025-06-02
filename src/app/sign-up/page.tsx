'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    // Mock registration - in a real app, you'd call your auth API
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, just show an error message
      setError('Esta funcionalidad aún no está disponible.');
    }, 1000);
  };

  return (
    <Layout>
      <div className="bg-tvam-black text-white min-h-[80vh] py-16">
        <div className="tvam-container max-w-md mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <Image
                src="/images/skull-logo.svg"
                alt="Te Vas A Morir"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
            </Link>
            <h1 className="text-3xl font-bold mb-2">Crear una cuenta</h1>
            <p className="text-gray-400">
              Únete a la comunidad Te Vas A Morir
            </p>
          </div>

          <div className="bg-tvam-darkblack p-8 rounded-lg">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="tvam-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="tvam-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="tvam-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="tvam-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma tu contraseña"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-tvam-blue text-white py-3 font-bold uppercase hover:bg-opacity-90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                ¿Ya tienes cuenta?{' '}
                <Link href="/sign-in" className="text-tvam-blue hover:underline">
                  Inicia Sesión
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <button className="w-full bg-white text-tvam-black py-3 font-bold flex items-center justify-center mb-4">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Registrarse con Google
              </button>

              <button className="w-full bg-[#1877F2] text-white py-3 font-bold flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.03954 23V12.5198H5.99611V8.98011H9.03954V6.34961C9.03954 3.39009 10.7482 1.73045 13.3886 1.73045C14.6482 1.73045 15.7217 1.82208 16.035 1.86256V4.94829L14.1937 4.94913C12.7383 4.94913 12.4373 5.62779 12.4373 6.60498V8.98011H15.9047L15.4647 12.5198H12.4373V23" />
                </svg>
                Registrarse con Facebook
              </button>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            Al registrarte, aceptas nuestros{' '}
            <Link href="/terminos" className="text-tvam-blue hover:underline">
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link href="/politica-de-privacidad" className="text-tvam-blue hover:underline">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
