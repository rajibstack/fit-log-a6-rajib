'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Footer() {
  return (
    <footer className="bg-[#0C0D10] border-t border-[#1C1F26] py-6 mt-auto">
      <div className="max-w-[1232px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        

        <Link href="/" className="flex items-center gap-2.5 group">
          <Image 
            src="/logo.png" 
            alt="FITLOG Logo" 
            width={28} 
            height={28} 
            className="w-7 h-7 object-contain"
          />
          <span className={`${oswald.className} text-[18px] font-bold tracking-wider text-white uppercase`}>
            FITLOG
          </span>
        </Link>


        <p className="text-gray-400 text-xs sm:text-sm font-normal">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}