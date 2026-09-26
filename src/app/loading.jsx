import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'], weight: ['700'] });

export default function Loading() {
  return (
    <div className="max-w-[1232px] mx-auto px-4 md:px-6 py-8 sm:py-10 space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-10 w-48 bg-[#12141B] rounded-lg"></div>
        <div className="h-4 w-72 bg-[#12141B] rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#12141B] border border-[#1C2029] rounded-2xl p-4 space-y-4">
            <div className="w-full h-44 bg-[#1C2029] rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-[#1C2029] rounded"></div>
              <div className="h-4 w-1/2 bg-[#1C2029] rounded"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 w-12 bg-[#1C2029] rounded"></div>
              <div className="h-4 w-16 bg-[#1C2029] rounded"></div>
              <div className="h-4 w-10 bg-[#1C2029] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}