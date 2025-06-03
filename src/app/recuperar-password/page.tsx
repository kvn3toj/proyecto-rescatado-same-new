'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Por favor introduce tu email');
      setIsLoading(false);
      return;
    }

    // Mock password recovery - in a real app, you'd call your auth API
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      // For demo purposes, show a success message instead of an actual recovery
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
            <h1 className="text-3xl font-bold mb-2">Recuperar Contraseña</h1>
            <p className="text-gray-400">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          <div className="bg-tvam-darkblack p-8 rounded-lg">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded mb-6">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-green-600 bg-opacity-20 border border-green-500 text-white p-4 rounded mb-6">
                <p className="font-bold mb-2">Revisa tu email</p>
                <p>
                  Si existe una cuenta asociada con {email}, recibirás un correo con instrucciones para restablecer tu contraseña.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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

                <button
                  type="submit"
                  className="w-full bg-tvam-blue text-white py-3 font-bold uppercase hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                <Link href="/sign-in" className="text-tvam-blue hover:underline">
                  ← Volver a Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link href="/sign-up" className="text-tvam-blue hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
