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
          <div className="w-10 h-10 bg-tvam-blue rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">🔥</span>
          </div>
          <span className="text-white text-xl font-bold">HUMBLE BEAST</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/academia" className="text-white hover:text-tvam-blue transition-colors">
            Academia
          </Link>
          <Link href="/escuela" className="text-white hover:text-tvam-blue transition-colors">
            Mente & Emociones
          </Link>
          <Link href="/eventos" className="text-white hover:text-tvam-blue transition-colors">
            Estrategia & Análisis
          </Link>
          <Link href="/conferencias" className="text-white hover:text-tvam-blue transition-colors">
            Entorno & Hábitos
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-tvam-black md:hidden">
            <nav className="flex flex-col space-y-4 p-4">
              <Link
                href="/academia"
                className="text-white hover:text-tvam-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Academia
              </Link>
              <Link
                href="/escuela"
                className="text-white hover:text-tvam-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mente & Emociones
              </Link>
              <Link
                href="/eventos"
                className="text-white hover:text-tvam-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Estrategia & Análisis
              </Link>
              <Link
                href="/conferencias"
                className="text-white hover:text-tvam-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Entorno & Hábitos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 