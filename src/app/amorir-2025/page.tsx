import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import AreaSection from '@/components/amorir/AreaSection';

export default function AMORirPage() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white">
        {/* Hero Section */}
        <section className="bg-tvam-black text-white py-16 md:py-24">
          <div className="tvam-container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AMORir: Un proceso para <span className="text-tvam-blue">empujarte conmigo y crecer.</span>
            </h1>

            <p className="text-xl md:text-2xl mb-10">
              en las 7 áreas que según yo, son más importantes de la vida:
            </p>
          </div>
        </section>

        {/* 7 Areas Section */}
        <section className="bg-tvam-darkblack py-16">
          <div className="tvam-container max-w-5xl mx-auto">
            <AreaSection
              title="Empezamos con CUERPO"
              description="Cambia cómo se ve, sin disciplina ni dietas vacas."
              imageSrc="/images/cuerpo.jpg"
            />

            <AreaSection
              title="Mente"
              subtitle="y Emociones"
              description="Haz las paces con tu pasado y reprograma tu mente para ir por una vida abundante sin sentir culpa."
              imageSrc="/images/mente.jpg"
              reverse
            />

            <AreaSection
              title="Trabajo"
              description="Descubre lo que otros pagarían de ti y aprende cómo comercializarlo."
              imageSrc="/images/trabajo.jpg"
            />

            <AreaSection
              title="Relaciones"
              description="Cómo convertirte en un hombre admirable o una mujer empoderada que todos quieran tener cerca."
              imageSrc="/images/relaciones.jpg"
              reverse
            />

            <AreaSection
              title="Dinero"
              description="El trabajo emocional que hice para ganar más y que el dinero no fuera una carga en mi vida."
              imageSrc="/images/dinero.jpg"
            />

            <AreaSection
              title="Productividad"
              description="El sistema que diseñé para no sentir que estaba desaprovechando mi vida."
              imageSrc="/images/productividad.jpg"
              reverse
            />

            <AreaSection
              title="Legado"
              subtitle="y Diversión"
              description="Ideas que quiero dejar a mis hijos para crear una vida en la que se sientan plenos."
              imageSrc="/images/legado.jpg"
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-tvam-black py-16">
          <div className="tvam-container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              ¿Qué te entrego?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="bg-tvam-darkblack p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Mi verdadera intimidad</h3>
                <p className="text-gray-300">
                  Invito a humanos a profundizar conmigo en temas muy personales que igual no podrían hablar ni con un amigo cercano sobre el tema que los está jodiendo.
                </p>
              </div>

              <div className="bg-tvam-darkblack p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Acceso a mí en 3D (eventos físicos)</h3>
                <p className="text-gray-300">
                  Invitaciones a fiestas, prioridad y trato especial en mis eventos, rifas para ir a algún retiro en Riviera Maya y posibilidad de conocernos.
                </p>
              </div>

              <div className="bg-tvam-darkblack p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Un lugar sin censura</h3>
                <p className="text-gray-300">
                  Mi propio filtro de conexión verdadera con quien quiere estar cerca. Aquí dentro, alejo al pinche hater que nada más critica en redes.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="countdown-container bg-tvam-darkblack p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">
                  Mi curso "Reprograma tu Mente para crecer"
                </h3>
                <p className="mb-6">Incluido sin costo para quien entre hoy.</p>

                {/* Countdown Timer - This would be a component in a real app */}
                <div className="flex justify-center gap-4 text-center">
                  <div className="bg-tvam-black p-3 rounded-lg w-20">
                    <div className="text-2xl font-bold">02</div>
                    <div className="text-xs">Días</div>
                  </div>
                  <div className="bg-tvam-black p-3 rounded-lg w-20">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs">Hrs</div>
                  </div>
                  <div className="bg-tvam-black p-3 rounded-lg w-20">
                    <div className="text-2xl font-bold">29</div>
                    <div className="text-xs">Min</div>
                  </div>
                  <div className="bg-tvam-black p-3 rounded-lg w-20">
                    <div className="text-2xl font-bold">17</div>
                    <div className="text-xs">Seg</div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  AMORir es un proceso a prueba de flojera y días culeros.
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Para mantener el fuego interno que sientes en enero, <strong>PERO todo el año.</strong>
                </p>
              </div>

              <div className="bg-tvam-darkblack p-8 rounded-lg inline-block">
                <div className="text-2xl font-bold mb-2">
                  <span className="text-3xl">200 MXN</span> / mes
                </div>
                <p className="text-gray-300 mb-6">Cancela cuando quieras.</p>
                <Button href="/sign-up" size="lg">
                  Entrarle
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
