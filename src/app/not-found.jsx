'use client';

import Link from 'next/link';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className={`${oswald.className} text-7xl sm:text-9xl font-extrabold text-[#C2F800] tracking-wider mb-2`}>
        404
      </h1>
      <h2 className={`${oswald.className} text-2xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-3`}>
        PAGE NOT FOUND
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-8">
        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}