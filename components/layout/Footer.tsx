import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="tvam-container">
        <div className="text-center mb-4">
          <Link href="mailto:apoyo@tevasamorir.com" className="text-white hover:text-gray-300 transition-colors">
            apoyo@tevasamorir.com
          </Link>
        </div>

        <div className="text-center text-sm mb-4">
          <p>Te Vas A Morir. Todos Los Derechos Reservados. <Link href="/politica-de-privacidad" className="text-white hover:text-gray-300 underline transition-colors">Política de privacidad.</Link></p>
        </div>

        <div className="text-center text-xs text-gray-400 mb-6">
          <p>YOU WILL DIE CORP.<br />2775 VILLA CREEK DR STE B-1275<br />FARMERS BRANCH TX 75235 USA</p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/skull-logo.svg"
            alt="Te Vas A Morir"
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
