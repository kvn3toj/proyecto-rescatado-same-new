'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-tvam-black py-4 sticky top-0 z-50">
      <div className="tvam-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/skull-logo.svg"
            alt="Te Vas A Morir"
            width={40}
            height={40}
            className="mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/amorir-2025" className="text-white hover:text-gray-300 transition-colors">
            AMORir
          </Link>
          <Link href="/eventos" className="text-white hover:text-gray-300 transition-colors">
            Eventos
          </Link>
          <Link href="/escuela" className="text-white hover:text-gray-300 transition-colors">
            Escuela
          </Link>
          <a
            href="https://tienda.tevasamorir.com"
            className="text-white hover:text-gray-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ropa
          </a>
          <Link href="/emails" className="text-white hover:text-gray-300 transition-colors">
            Emails Pendejos
          </Link>
          <Link
            href="/sign-in"
            className="bg-tvam-blue px-4 py-2 rounded text-white font-medium hover:bg-opacity-90 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-tvam-darkblack p-4 absolute top-full left-0 right-0 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/amorir-2025"
              className="text-white hover:text-gray-300 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AMORir
            </Link>
            <Link
              href="/eventos"
              className="text-white hover:text-gray-300 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link
              href="/escuela"
              className="text-white hover:text-gray-300 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Escuela
            </Link>
            <a
              href="https://tienda.tevasamorir.com"
              className="text-white hover:text-gray-300 py-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Ropa
            </a>
            <Link
              href="/emails"
              className="text-white hover:text-gray-300 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Emails Pendejos
            </Link>
            <Link
              href="/sign-in"
              className="bg-tvam-blue w-full text-center px-4 py-2 rounded text-white font-medium hover:bg-opacity-90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
