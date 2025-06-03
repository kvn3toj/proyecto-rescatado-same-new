import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white min-h-[80vh] flex items-center">
        <div className="tvam-container max-w-4xl mx-auto text-center py-16">
          <div className="mb-8">
            <Image
              src="/images/skull-logo.svg"
              alt="Te Vas A Morir"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">404</h1>

          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Esta página ya se murió
          </h2>

          <p className="text-xl mb-12">
            Lo que buscas no existe... como la inmortalidad.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button href="/" size="lg">
              Ir al Inicio
            </Button>

            <Button href="/amorir-2025" variant="outline" size="lg">
              Conocer AMORir
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
