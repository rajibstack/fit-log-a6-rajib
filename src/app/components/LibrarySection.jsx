'use client';

import { useEffect, useState } from 'react';
import { Oswald } from 'next/font/google';
import WorkoutCard from './WorkoutCard';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) {
          throw new Error('Failed to fetch workout data');
        }
        const data = await res.json();
        

        const workoutList = Array.isArray(data) ? data : data.data || data.workouts || [];
        setWorkouts(workoutList);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="max-w-[1232px] mx-auto px-4 md:px-6 py-12">

      <div className="mb-8">
        <h2 className={`${oswald.className} text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight`}>
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 font-normal">
          Twelve lifts covering every major muscle group.
        </p>
      </div>


      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-[#12141A] border border-[#1C2029] rounded-2xl p-4 animate-pulse h-[340px] flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-[#181B22] rounded-xl mb-4"></div>
                <div className="w-20 h-5 bg-[#181B22] rounded-full mb-3"></div>
                <div className="w-3/4 h-6 bg-[#181B22] rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-[#181B22] rounded"></div>
              </div>
              <div className="w-full h-8 bg-[#181B22] rounded mt-4"></div>
            </div>
          ))}
        </div>
      )}


      {error && !loading && (
        <div className="bg-[#12141A] border border-red-900/50 rounded-2xl p-8 text-center text-red-400">
          <p>Failed to load workouts: {error}</p>
        </div>
      )}


      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <WorkoutCard key={workout.id || workout._id || index} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}