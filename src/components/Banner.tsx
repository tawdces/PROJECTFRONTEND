"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % covers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [covers.length]);

  const handleAdvance = () => {
    setIndex((prev) => (prev + 1) % covers.length);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden cursor-pointer" onClick={handleAdvance}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
            willChange: "transform",
          }}
        >
          {covers.map((cover, idx) => (
            <div key={cover + idx} className="relative min-w-full h-full">
              <Image
                src={cover}
                alt="hero background"
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
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