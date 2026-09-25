'use client';

import Image from 'next/image';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function Hero() {

  const handleScrollToLibrary = (e) => {
    e.preventDefault();
    const element = document.getElementById('library');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1232px] mx-auto px-4 md:px-6 py-6 md:py-10">

      <div className="bg-[#12141A] border border-[#1C2029] rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          

          <div className="lg:col-span-7 space-y-5">

            <p className="text-[#C2F800] text-xs sm:text-sm font-bold tracking-widest uppercase">
              WORKOUT LIBRARY
            </p>


            <h1 className={`${oswald.className} text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-[1.08] tracking-tight uppercase`}>
              TRAIN WITH INTENT.
              LOG EVERY SET.
            </h1>


            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>


            <div className="pt-3">
              <a
                href="#library"
                onClick={handleScrollToLibrary}
                className="inline-flex items-center justify-center bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-sm uppercase px-6 py-3.5 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#C2F800]/10 cursor-pointer"
              >
                <span>BROWSE WORKOUTS</span>
              </a>
            </div>
          </div>


          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[360px] lg:max-w-none h-[280px] sm:h-[350px] lg:h-[380px]">
              <Image
                src="/banner.png"
                alt="FitLog Gym Equipment"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}