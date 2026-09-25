"use client";

import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

export default function WorkoutCard({ workout }) {
  const id = workout._id || workout.id;
  const name = workout.name || workout.title || "WORKOUT NAME";
  const equipment =
    workout.equipment ||
    workout.equipments ||
    (Array.isArray(workout.equipmentList)
      ? workout.equipmentList.join(", ")
      : "Equipment");
  const duration = workout.duration
    ? typeof workout.duration === "number"
      ? `${workout.duration} min`
      : workout.duration
    : "25 min";
  const calories =
    workout.calories || workout.kcal
      ? typeof (workout.calories || workout.kcal) === "number"
        ? `${workout.calories || workout.kcal} kcal`
        : workout.calories || workout.kcal
      : "180 kcal";
  const rating = workout.rating || "4.8";
  const imageSrc =
    workout.image || workout.imageUrl || workout.img || "/banner.png";

  let categories = [];
  if (Array.isArray(workout.category)) categories = workout.category;
  else if (Array.isArray(workout.categories)) categories = workout.categories;
  else if (typeof workout.category === "string")
    categories = [workout.category];
  else if (Array.isArray(workout.muscleGroup)) categories = workout.muscleGroup;
  else if (typeof workout.muscleGroup === "string")
    categories = [workout.muscleGroup];
  else categories = ["CHEST", "ARMS"];

  return (
    <Link
      href={`/workout/${id}`}
      className="group bg-[#12141A] border border-[#1C2029] hover:border-[#C2F800]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <div className="relative w-full h-48 sm:h-52 bg-[#181B22] overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5 pb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#C2F800] text-black text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wide"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3
            className={`${oswald.className} text-xl font-bold text-white uppercase group-hover:text-[#C2F800] transition-colors leading-tight mb-1.5 tracking-wide`}
          >
            {name}
          </h3>

          <p className="text-xs text-gray-400 font-normal">{equipment}</p>
        </div>
      </div>

      <div className="mx-5 mb-4 pt-3 border-t border-[#1C2029] flex items-center justify-between text-xs text-gray-400 font-medium">
        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
            <path strokeWidth="1.5" strokeLinecap="round" d="M12 7v5l3 3" />
          </svg>
          <span>{duration}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
          </svg>
          <span>{calories}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span>{rating}</span>
        </div>
      </div>
    </Link>
  );
}
