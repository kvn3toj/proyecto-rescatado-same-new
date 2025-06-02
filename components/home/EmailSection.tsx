import EmailSubscribe from '../ui/EmailSubscribe';

const EmailSection = () => {
  return (
    <section className="bg-tvam-darkblack text-white py-16">
      <div className="tvam-container">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Emails pendejos
          </h2>

          <h3 className="text-xl md:text-2xl mb-8">
            Para humanos chingones
          </h3>

          <div className="flex flex-col md:flex-row gap-2 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-tvam-blue mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <span>Los escribo para crecer</span>
            </div>

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
              <span>O darte una idea que te cambie la puta vida.</span>
            </div>
          </div>

          <div className="bg-tvam-black p-6 rounded-lg">
            <h4 className="text-lg mb-4">Deja aquí tus datos. Si quieres.</h4>
            <EmailSubscribe
              title=""
              subtitle=""
              buttonText="RECIBIR EMAILS PENDEJOS"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
