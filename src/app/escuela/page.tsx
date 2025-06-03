import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import Button from '@/components/ui/Button';

const CourseCard = ({
  title,
  description,
  price,
  imageSrc,
  tag
}: {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  tag: string;
}) => {
  return (
    <div className="bg-tvam-black rounded-lg overflow-hidden">
      <div className="relative h-60">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
        />
        <div className="absolute top-4 right-4 bg-tvam-blue px-3 py-1 text-sm rounded">
          {tag}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">{price}</span>
          <span className="text-gray-400">Acceso de por vida</span>
        </div>

        <Button href="#" variant="primary" size="md" className="w-full">
          INSCRIBIRME
        </Button>
      </div>
    </div>
  );
};

export default function EscuelaPage() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-tvam-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/escuela.jpg"
              alt="Escuela Te Vas A Morir"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </div>

          <div className="relative z-10 tvam-container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              LA ESCUELA <span className="text-tvam-blue">DE LA VIDA</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8">
              Cursos en línea para las áreas más importantes de la vida
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-tvam-darkblack">
          <div className="tvam-container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Cursos destacados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <CourseCard
                title="Reprograma tu Mente"
                description="Elimina las creencias limitantes que te impiden avanzar y crea nuevos patrones mentales."
                price="3,497 MXN"
                imageSrc="/images/mente.jpg"
                tag="BESTSELLER"
              />

              <CourseCard
                title="Finanzas para Mortales"
                description="Aprende a manejar tu dinero sin complicaciones y construye riqueza de forma consistente."
                price="2,997 MXN"
                imageSrc="/images/dinero.jpg"
                tag="NUEVO"
              />

              <CourseCard
                title="Relaciones que Suman"
                description="Transforma tus relaciones personales y profesionales para crear conexiones auténticas."
                price="1,997 MXN"
                imageSrc="/images/relaciones.jpg"
                tag="POPULAR"
              />
            </div>

            {/* More Courses */}
            <h2 className="text-3xl font-bold mb-8 text-center">Más cursos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-tvam-black p-6 rounded-lg flex items-center">
                <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src="/images/cuerpo.jpg"
                    alt="Cuerpo"
                    fill
                    className="object-cover object-center rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Tu Cuerpo, Tu Templo</h3>
                  <p className="text-gray-300 text-sm mb-2">Cambia tu relación con tu cuerpo sin dietas extremas</p>
                  <span className="text-tvam-blue font-bold">1,497 MXN</span>
                </div>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg flex items-center">
                <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src="/images/trabajo.jpg"
                    alt="Trabajo"
                    fill
                    className="object-cover object-center rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Propósito y Trabajo</h3>
                  <p className="text-gray-300 text-sm mb-2">Encuentra tu propósito y conviértelo en tu profesión</p>
                  <span className="text-tvam-blue font-bold">2,497 MXN</span>
                </div>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg flex items-center">
                <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src="/images/legado.jpg"
                    alt="Legado"
                    fill
                    className="object-cover object-center rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Construyendo Legado</h3>
                  <p className="text-gray-300 text-sm mb-2">Cómo dejar un impacto duradero más allá de tu existencia</p>
                  <span className="text-tvam-blue font-bold">1,997 MXN</span>
                </div>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg flex items-center">
                <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                  <Image
                    src="/images/trabajo.jpg"
                    alt="Productividad"
                    fill
                    className="object-cover object-center rounded"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Productividad Real</h3>
                  <p className="text-gray-300 text-sm mb-2">Sistema para hacer más con menos esfuerzo mental</p>
                  <span className="text-tvam-blue font-bold">1,497 MXN</span>
                </div>
              </div>
            </div>

            {/* Bundle Offer */}
            <div className="bg-tvam-blue p-8 rounded-lg text-center mb-16">
              <h3 className="text-2xl font-bold mb-4">Paquete completo</h3>
              <p className="mb-6">Todos los cursos + actualizaciones futuras + acceso a sesiones en vivo</p>
              <div className="flex justify-center items-center mb-6">
                <span className="text-gray-300 line-through mr-3">15,982 MXN</span>
                <span className="text-3xl font-bold">9,997 MXN</span>
              </div>
              <Button href="#" variant="secondary" size="lg">
                OBTENER PAQUETE COMPLETO
              </Button>
            </div>

            {/* Testimonials */}
            <h2 className="text-3xl font-bold mb-8 text-center">Testimonios</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-tvam-black p-6 rounded-lg">
                <p className="mb-4 italic">
                  "El curso de Reprograma tu Mente me cambió completamente la forma de ver mis problemas.
                  Ahora tengo herramientas concretas para enfrentar cualquier situación."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-tvam-blue mr-3 flex items-center justify-center text-lg font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-bold">María García</p>
                    <p className="text-sm text-gray-400">Empresaria</p>
                  </div>
                </div>
              </div>

              <div className="bg-tvam-black p-6 rounded-lg">
                <p className="mb-4 italic">
                  "Finanzas para Mortales me enseñó más en 5 horas que años de estar leyendo blogs
                  financieros. Información clara y aplicable desde el día uno."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-tvam-blue mr-3 flex items-center justify-center text-lg font-bold">
                    J
                  </div>
                  <div>
                    <p className="font-bold">Juan Pérez</p>
                    <p className="text-sm text-gray-400">Ingeniero</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
