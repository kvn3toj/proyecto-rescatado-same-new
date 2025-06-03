import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import Button from '@/components/ui/Button';
import EmailSubscribe from '@/components/ui/EmailSubscribe';

export default function ConferenciasPage() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-tvam-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/conferencias.jpg"
              alt="Conferencias Te Vas A Morir"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>

          <div className="relative z-10 tvam-container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              CONFERENCIAS <span className="text-tvam-blue">EMPRESARIALES</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8">
              Charlas directas para transformar la mentalidad de los equipos de trabajo
            </p>

            <Button href="#contacto" variant="primary" size="lg">
              SOLICITAR INFORMACIÓN
            </Button>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-16 bg-tvam-darkblack">
          <div className="tvam-container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Temas de impacto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-tvam-black p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-tvam-blue rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Productividad sin Burnout</h3>
                </div>
                <p className="text-gray-300">
                  Cómo lograr más resultados sin agotar a los equipos. Técnicas prácticas para el equilibrio entre alto rendimiento y bienestar.
                </p>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-tvam-blue rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Liderazgo Consciente</h3>
                </div>
                <p className="text-gray-300">
                  Un enfoque para liderar desde la autenticidad y la construcción de confianza. Herramientas para desarrollar equipos comprometidos.
                </p>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-tvam-blue rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Gestión del Cambio</h3>
                </div>
                <p className="text-gray-300">
                  Estrategias para navegar transiciones organizacionales con menor resistencia y mayor adaptabilidad.
                </p>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-tvam-blue rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Bienestar Corporativo</h3>
                </div>
                <p className="text-gray-300">
                  Implementación de cultura de bienestar que impacta directamente en la productividad y retención de talento.
                </p>
              </div>
            </div>

            {/* Format Options */}
            <h2 className="text-3xl font-bold mb-8 text-center">Formatos disponibles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-tvam-black p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-tvam-blue mb-4">45'</div>
                <h3 className="text-xl font-bold mb-2">Conferencia Express</h3>
                <p className="text-gray-300 mb-4">
                  Sesión de alto impacto ideal para kickoffs o eventos con agenda ajustada.
                </p>
                <p className="font-bold">Hasta 500 asistentes</p>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-tvam-blue mb-4">90'</div>
                <h3 className="text-xl font-bold mb-2">Conferencia Completa</h3>
                <p className="text-gray-300 mb-4">
                  Presentación profunda con herramientas prácticas y sesión de preguntas.
                </p>
                <p className="font-bold">Hasta 1000 asistentes</p>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-tvam-blue mb-4">4h</div>
                <h3 className="text-xl font-bold mb-2">Workshop</h3>
                <p className="text-gray-300 mb-4">
                  Sesión interactiva con ejercicios prácticos y dinámicas grupales.
                </p>
                <p className="font-bold">Hasta 100 asistentes</p>
              </div>
            </div>

            {/* Companies Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Empresas que han confiado en nosotros
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-tvam-black p-4 rounded-lg flex items-center justify-center h-24">
                  <div className="text-xl font-bold text-gray-400">Empresa 1</div>
                </div>
                <div className="bg-tvam-black p-4 rounded-lg flex items-center justify-center h-24">
                  <div className="text-xl font-bold text-gray-400">Empresa 2</div>
                </div>
                <div className="bg-tvam-black p-4 rounded-lg flex items-center justify-center h-24">
                  <div className="text-xl font-bold text-gray-400">Empresa 3</div>
                </div>
                <div className="bg-tvam-black p-4 rounded-lg flex items-center justify-center h-24">
                  <div className="text-xl font-bold text-gray-400">Empresa 4</div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Lo que dicen de nosotros
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-tvam-black p-6 rounded-lg">
                  <p className="text-xl italic mb-6">
                    "La conferencia de Diego transformó por completo la mentalidad de nuestro equipo directivo.
                    Su forma directa y sin filtros de abordar los temas fue exactamente lo que necesitábamos."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-tvam-blue mr-4 flex items-center justify-center text-lg font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-bold">Alejandra Rodríguez</p>
                      <p className="text-sm text-gray-400">Directora de RRHH, Empresa Nacional</p>
                    </div>
                  </div>
                </div>

                <div className="bg-tvam-black p-6 rounded-lg">
                  <p className="text-xl italic mb-6">
                    "Contratamos el workshop de productividad y el ROI fue inmediato. Las herramientas
                    que compartió son prácticas y nuestros equipos las implementaron desde el día siguiente."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-tvam-blue mr-4 flex items-center justify-center text-lg font-bold">
                      R
                    </div>
                    <div>
                      <p className="font-bold">Roberto Méndez</p>
                      <p className="text-sm text-gray-400">CEO, Startup Tecnológica</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contacto" className="bg-tvam-blue p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Solicita información
              </h2>

              <div className="max-w-2xl mx-auto">
                <p className="text-center mb-8">
                  Déjanos tus datos y nuestro equipo te contactará para brindarte toda la información
                  sobre disponibilidad, tarifas y personalización de las conferencias.
                </p>

                <EmailSubscribe
                  title=""
                  subtitle=""
                  buttonText="SOLICITAR INFORMACIÓN"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
