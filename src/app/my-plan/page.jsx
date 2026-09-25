'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Oswald } from 'next/font/google';
import { useFitLog } from '@/context/FitLogContext';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function MyPlanPage() {
  const { planItems, savedItems, removeFromPlan, removeFromSaved, markAsDone } = useFitLog();
  const [activeTab, setActiveTab] = useState('today');
  const [sortBy, setSortBy] = useState('duration');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const currentList = activeTab === 'today' ? planItems : savedItems;

  const parseNumber = (val, fallback = 0) => {
    if (val === null || val === undefined || val === '') return fallback;
    if (typeof val === 'number') return val;
    const match = val.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : fallback;
  };

  const parseFloatNumber = (val, fallback = 0) => {
    if (val === null || val === undefined || val === '') return fallback;
    if (typeof val === 'number') return val;
    const match = val.toString().match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : fallback;
  };

  const getCalorieValue = (item) => {
    const raw = item.calories ?? item.kcal ?? item.caloriesBurned ?? item.calorie ?? item.calories_burned;
    return parseNumber(raw, 70);
  };

  const getDurationValue = (item) => {
    const raw = item.duration ?? item.time ?? item.durationMinutes;
    return parseNumber(raw, 15);
  };

  const getRatingValue = (item) => {
    const raw = item.rating ?? item.stars ?? item.rate;
    return parseFloatNumber(raw, 4.5);
  };

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, item) => acc + getDurationValue(item), 0);
  const totalCalories = currentList.reduce((acc, item) => acc + getCalorieValue(item), 0);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return getDurationValue(a) - getDurationValue(b);
    }
    if (sortBy === 'calories') {
      return getCalorieValue(a) - getCalorieValue(b);
    }
    if (sortBy === 'rating') {
      return getRatingValue(b) - getRatingValue(a);
    }
    return 0;
  });

  return (
    <div className="max-w-[1232px] mx-auto px-4 md:px-6 py-8 sm:py-10 space-y-8">
      <div>
        <h1 className={`${oswald.className} text-3xl sm:text-4xl lg:text-[40px] font-bold text-white uppercase tracking-wide mb-1`}>
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-normal">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-[#12141B] border border-[#1C2029] rounded-2xl p-5 sm:p-6 grid grid-cols-3 divide-x divide-[#1C2029]">
        <div className="px-2 sm:px-6 first:pl-0">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Exercises</p>
          <p className={`${oswald.className} text-2xl sm:text-4xl font-bold text-[#C2F800]`}>
            {totalExercises}
          </p>
        </div>

        <div className="px-2 sm:px-6">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Minutes</p>
          <p className={`${oswald.className} text-2xl sm:text-4xl font-bold text-white`}>
            {totalMinutes}
          </p>
        </div>

        <div className="px-2 sm:px-6">
          <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">Calories</p>
          <p className={`${oswald.className} text-2xl sm:text-4xl font-bold text-white`}>
            {totalCalories}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="bg-[#12141B] border border-[#1C2029] p-1 rounded-xl inline-flex items-center w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-[#1C2029] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#1C2029] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-gray-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12141B] border border-[#1C2029] text-white text-xs font-medium px-3 py-2 rounded-xl focus:outline-none cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="rating">Rating</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm font-medium animate-pulse">
          Loading workouts…
        </div>
      ) : sortedList.length === 0 ? (
        <div className="bg-[#12141B]/50 border border-[#1C2029] rounded-2xl py-16 px-4 text-center flex flex-col items-center justify-center gap-3">
          <h2 className={`${oswald.className} text-xl sm:text-2xl font-bold text-white tracking-wider uppercase`}>
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center justify-center bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-all cursor-pointer"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => {
            const id = item.id || item._id;
            const name = item.name || item.title || 'WORKOUT';
            const equipment = item.equipment || item.equipments || 'Equipment';
            const durationVal = getDurationValue(item);
            const calorieVal = getCalorieValue(item);
            const ratingVal = getRatingValue(item);
            const imageSrc = item.image || item.imageUrl || item.img || '/banner.png';

            return (
              <div
                key={id}
                className="bg-[#12141B] border border-[#1C2029] hover:border-[#2C3240] transition-colors rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-20 h-16 sm:w-28 sm:h-20 bg-[#1C2029] rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={imageSrc}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className={`${oswald.className} text-base sm:text-lg font-bold text-white uppercase tracking-wide leading-tight`}>
                      {name}
                    </h3>
                    <p className="text-gray-400 text-xs font-normal">
                      {equipment}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {durationVal} min
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                        {calorieVal} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {ratingVal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#1C2029]">
                  <Link
                    href={`/workout/${id}`}
                    className="inline-flex items-center justify-center border border-[#2C3240] hover:bg-[#1A1D27] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </Link>

                  {activeTab === 'today' && (
                    <button
                      onClick={() => markAsDone(id)}
                      className="inline-flex items-center justify-center gap-1.5 bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark as Done</span>
                    </button>
                  )}

                  <button
                    onClick={() => activeTab === 'today' ? removeFromPlan(id) : removeFromSaved(id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Remove workout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}