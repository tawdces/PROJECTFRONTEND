"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden cursor-pointer" onClick={() => setIndex((i) => i + 1)}>
      <Image
        src={covers[index % 4]}
        alt="hero background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg max-w-4xl">
          Find your perfect campsite, effortlessly
        </h1>
        <p className="mt-4 text-base md:text-xl text-white/90 max-w-2xl drop-shadow">
          Book campgrounds for any trip—quick escapes, group adventures, or solo retreats—all in one place.
        </p>
      </div>
      {session && (
        <div className="absolute top-5 right-5 z-20 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
          Welcome, {session.user?.name} ({session.user?.role})
        </div>
      )}
    </div>
  );
}