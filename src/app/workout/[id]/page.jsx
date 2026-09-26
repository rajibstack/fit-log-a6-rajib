'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Oswald } from 'next/font/google';
import { useFitLog } from '@/context/FitLogContext';
import toast from 'react-hot-toast';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { addToPlan, saveForLater } = useFitLog();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkoutDetail() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error('Failed to fetch workout details');
        const data = await res.json();
        
        const item = data.data || data.workout || data;
        setWorkout(item);
      } catch (err) {
        console.error('Error fetching detail:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchWorkoutDetail();
  }, [id]);


  const handleAddToPlan = () => {
    if (workout) {
      addToPlan(workout);
    }
  };

  const handleSaveForLater = () => {
    if (workout) {
      saveForLater(workout);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1232px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-5 h-[450px] bg-[#12141A] rounded-2xl"></div>
          <div className="lg:col-span-7 space-y-4">
            <div className="h-10 w-2/3 bg-[#12141A] rounded"></div>
            <div className="h-16 w-full bg-[#12141A] rounded"></div>
            <div className="h-64 w-full bg-[#12141A] rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-[1232px] mx-auto px-4 md:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Workout Not Found</h2>
        <p className="text-gray-400">Unable to load the workout details.</p>
      </div>
    );
  }

  const name = workout.name || workout.title || 'HOLLOW-BODY PLANK';
  const description = workout.description || 'A braced plank variation that trains anti-extension through the entire anterior core.';
  const equipment = workout.equipment || workout.equipments || 'Bodyweight';
  const difficulty = workout.difficulty || 'Beginner';
  const sets = workout.sets || 3;
  const reps = workout.reps || '30-45s';
  const duration = workout.duration ? (typeof workout.duration === 'number' ? `${workout.duration} min` : workout.duration) : '10 min';
  const rawCal = workout.calories || workout.kcal;
  const calories = rawCal ? (typeof rawCal === 'number' ? `${rawCal} kcal` : rawCal) : '180 kcal';
  const rating = workout.rating || '4.4';
  const imageSrc = workout.image || workout.imageUrl || workout.img || '/banner.png';

  let categories = [];
  if (Array.isArray(workout.category)) categories = workout.category;
  else if (Array.isArray(workout.categories)) categories = workout.categories;
  else if (workout.category) categories = [workout.category];
  else categories = ['CHEST', 'ARMS'];

  const instructions = workout.instructions && Array.isArray(workout.instructions) 
    ? workout.instructions 
    : [
        'Set elbows under shoulders and squeeze glutes and quads.',
        'Tuck the pelvis so the lower back stays flat.',
        'Breathe into the brace without sagging the hips.',
        'Hold for the prescribed time, then rest and repeat.'
      ];

  return (
    <div className="max-w-[1232px] mx-auto px-4 md:px-6 py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        

        <div className="lg:col-span-6">
          <div className="relative w-full h-[400px] sm:h-[735px] bg-[#12141A] border border-[#1C2029] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={imageSrc}
              alt={name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>


        <div className="lg:col-span-6 space-y-5">
          
          <div>
            <h1 className={`${oswald.className} text-3xl sm:text-4xl lg:text-[40px] font-bold text-white uppercase tracking-wide mb-2 leading-tight`}>
              {name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-normal leading-relaxed">
              {description}
            </p>
          </div>


          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat, index) => (
              <span
                key={index}
                className="bg-[#C2F800] text-black text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>


          <div className="bg-[#12141B] border border-[#1C2029] rounded-2xl p-4 sm:p-5 divide-y divide-[#1C2029]/80">
            <div className="pb-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">EQUIPMENT</span>
              <span className="text-white font-bold">{equipment}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">DIFFICULTY</span>
              <span className="text-white font-bold">{difficulty}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">SETS</span>
              <span className="text-white font-bold">{sets}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">REPS</span>
              <span className="text-white font-bold">{reps}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">DURATION</span>
              <span className="text-white font-bold">{duration}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">CALORIES</span>
              <span className="text-white font-bold">{calories}</span>
            </div>
            <div className="pt-2.5 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-semibold tracking-wider uppercase">RATING</span>
              <span className="text-white font-bold">{rating}</span>
            </div>
          </div>


          <div className="pt-2">
            <h3 className={`${oswald.className} text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-3`}>
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs sm:text-sm text-gray-300">
              {instructions.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-gray-400 font-medium">{idx + 1}.</span>
                  <span className="leading-relaxed text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>


          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAddToPlan}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add to today's plan</span>
            </button>

            <button
              onClick={handleSaveForLater}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#12141B] hover:bg-[#1A1D27] border border-[#232733] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save for later</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}