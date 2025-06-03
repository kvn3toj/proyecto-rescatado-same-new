'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would be an API call to end the session
    // For demo purposes, just simulate a delay and redirect
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="bg-tvam-black text-white min-h-[80vh] flex items-center justify-center">
        <div className="tvam-container max-w-md mx-auto text-center py-16">
          <Image
            src="/images/skull-logo.svg"
            alt="Te Vas A Morir"
            width={80}
            height={80}
            className="mx-auto mb-8"
          />

          <h1 className="text-3xl font-bold mb-6">Cerrando sesión...</h1>

          <div className="bg-tvam-darkblack p-6 rounded-lg">
            <p className="mb-6">
              Has cerrado sesión correctamente.
            </p>

            <p className="text-gray-400 mb-4">
              Serás redirigido automáticamente a la página de inicio.
            </p>

            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-tvam-blue animate-[progress_2s_linear]"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
