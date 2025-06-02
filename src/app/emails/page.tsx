import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import EmailSubscribe from '@/components/ui/EmailSubscribe';

export default function EmailsPage() {
  return (
    <Layout>
      <div className="bg-tvam-black text-white">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="md:w-1/2 relative h-[400px] md:h-auto">
            <Image
              src="/images/emails-header.webp"
              alt="Diego Dreyfus"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Content Side */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Emails pendejos
            </h1>

            <h2 className="text-xl md:text-2xl mb-8">
              Para humanos chingones
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-tvam-blue mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <span>La neta, podrían no servirte de nada.</span>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-tvam-blue mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <span>O quizá 1 de mis ideas te inspira y te cambia la puta vida jaja</span>
              </div>
            </div>

            <EmailSubscribe
              title=""
              subtitle=""
              buttonText="RECIBIR EMAILS PENDEJOS"
            />
          </div>
        </section>

        {/* Provocative Section */}
        <section className="py-16 bg-gradient-to-b from-tvam-black to-tvam-darkblack">
          <div className="tvam-container max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Put* el que no se suscriba a mi <span className="text-tvam-blue">lista de emails!</span>
            </h2>

            <div className="bg-tvam-darkblack p-8 rounded-lg mb-16">
              <h3 className="text-2xl font-bold mb-4">
                Si te ofendió la frase de arriba...
              </h3>

              <p className="mb-6">
                Creo que este contenido la neta no es para ti. (Aunque igual y te da una idea de cómo tomarte la vida más a la ligera y pasarla chingón (Puta madre! volví a ser grosero)
              </p>

              <p className="mb-8">
                Ya en serio. A veces me da por escribir y me siento sumamente agradecido por recibir mensajes así:
              </p>

              <div className="bg-white text-tvam-black p-4 rounded mb-8">
                <p className="font-medium">
                  Y te amo más que a mi primer amor pero no eres el amor de mi vida, El amor de mi vida soy yo y tú solo eres un reflejo de lo mucho que me amo y si eso nos dura 70 años, que suerte y sino, que suerte.
                </p>
                <p className="text-right text-tvam-blue font-bold">
                  GREGORIO DENIS ❤️
                </p>
              </div>

              <p className="mb-4">
                Pero me vale madre mostrarte solo mi parte "linda".
              </p>

              <p className="mb-6">
                Eso no es todo lo que soy y prefiero que me conozcas completo: con mi luz y mi mierda.
              </p>

              <p className="mb-4">
                Así que aquí van más opiniones:
              </p>

              <div className="bg-white text-tvam-black p-4 rounded mb-4">
                <p className="font-medium">
                  <span className="text-gray-500">En respuesta a @DIEGO_DREYFUS:</span><br />
                  Vendes mucho humo pelón, la neta.
                </p>
              </div>

              <div className="bg-white text-tvam-black p-4 rounded mb-6">
                <p className="font-medium">
                  <span className="text-gray-500">En respuesta a @DIEGO_DREYFUS:</span><br />
                  Se puede decir que eres el Ricardo Arjona de las frases motivacionales.
                </p>
              </div>

              <p className="text-xl font-bold">
                ¡Aguevo! ¡Arjona es un chingón!
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <h3 className="text-4xl font-bold mb-6 text-center">
                Úsame.
              </h3>

              <p className="text-center mb-8">
                Recibe en tu email filosofadas para crecer, según yo.<br />
                Si quieres. Si no, ¡ni pedo!
              </p>

              <EmailSubscribe
                title=""
                subtitle=""
                buttonText="QUIERO TUS PUTOS EMAILS"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
