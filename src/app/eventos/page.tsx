import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function EventosPage() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-tvam-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/eventos.jpg"
              alt="Eventos Te Vas A Morir"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>

          <div className="relative z-10 tvam-container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              EVENTOS <span className="text-tvam-blue">PRESENCIALES</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8">
              Retiros, monólogos y experiencias diseñadas para provocarte
            </p>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 bg-tvam-darkblack">
          <div className="tvam-container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Próximos eventos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Event Card 1 */}
              <div className="bg-tvam-black rounded-lg overflow-hidden">
                <div className="relative h-60">
                  <Image
                    src="/images/eventos.jpg"
                    alt="Retiro AMORir"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-tvam-blue px-3 py-1 text-sm rounded">10-12 Jun 2025</span>
                    <span className="text-gray-400">Cancún, MX</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Retiro AMORir</h3>
                  <p className="text-gray-300 mb-4">
                    Un fin de semana para reconectar contigo mismo y desconectar del ruido.
                  </p>

                  <Button href="#" variant="primary" size="sm">
                    RESERVAR LUGAR
                  </Button>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="bg-tvam-black rounded-lg overflow-hidden">
                <div className="relative h-60">
                  <Image
                    src="/images/conferencias.jpg"
                    alt="Monólogo Te Vas A Morir"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-tvam-blue px-3 py-1 text-sm rounded">25 Jul 2025</span>
                    <span className="text-gray-400">CDMX, MX</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Monólogo TVAM</h3>
                  <p className="text-gray-300 mb-4">
                    2 horas de reflexiones, risas y herramientas prácticas para la vida.
                  </p>

                  <Button href="#" variant="primary" size="sm">
                    COMPRAR BOLETOS
                  </Button>
                </div>
              </div>
            </div>

            {/* Past Events */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Eventos anteriores</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative h-48 rounded-lg overflow-hidden group">
                  <Image
                    src="/images/eventos.jpg"
                    alt="Evento anterior"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold">Retiro Playa del Carmen</p>
                    <p className="text-sm">Marzo 2025</p>
                  </div>
                </div>

                <div className="relative h-48 rounded-lg overflow-hidden group">
                  <Image
                    src="/images/conferencias.jpg"
                    alt="Evento anterior"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold">Conferencia Guadalajara</p>
                    <p className="text-sm">Febrero 2025</p>
                  </div>
                </div>

                <div className="relative h-48 rounded-lg overflow-hidden group">
                  <Image
                    src="/images/eventos.jpg"
                    alt="Evento anterior"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold">Monólogo Monterrey</p>
                    <p className="text-sm">Enero 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-tvam-blue p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">¿Quieres traer un evento a tu ciudad?</h3>
              <p className="mb-6">Escríbenos y organizamos algo chingón juntos.</p>
              <Button href="mailto:eventos@tevasamorir.com" variant="secondary" size="md">
                CONTACTAR
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
