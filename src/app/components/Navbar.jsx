'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Oswald } from 'next/font/google';
import { useFitLog } from '@/context/FitLogContext';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { planCount, savedCount } = useFitLog();

  const navLinks = [
    { name: 'Workouts', path: '/' },
    { name: 'My Plan', path: '/my-plan' },
  ];

  return (
    <header className="bg-[#0C0D10] border-b border-[#1C1F26] sticky top-0 z-50">
      <div className="max-w-[1232px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        

        <Link href="/" className="flex items-center gap-2.5 group">
          <Image 
            src="/logo.png" 
            alt="FITLOG Logo" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain"
          />
          <span className={`${oswald.className} text-[18px] font-[900] tracking-wider text-white uppercase`}>
            FITLOG
          </span>
        </Link>


        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#1A2312] text-[#C2F800]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>


        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-gray-300 font-medium hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="bg-[#C2F800] text-black font-bold h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center text-xs">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-gray-300 font-medium hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="border border-[#2D333F] text-gray-300 font-medium h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center text-xs bg-[#161920]">
              {savedCount}
            </span>
          </Link>
        </div>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>


      {isOpen && (
        <div className="md:hidden bg-[#0C0D10] border-b border-[#1C1F26] px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1A2312] text-[#C2F800]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#1C1F26] flex items-center justify-around">
            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300 font-medium"
            >
              <span>Plan</span>
              <span className="bg-[#C2F800] text-black font-bold h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center text-xs">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300 font-medium"
            >
              <span>Saved</span>
              <span className="border border-[#2D333F] text-gray-300 font-medium h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center text-xs bg-[#161920]">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}