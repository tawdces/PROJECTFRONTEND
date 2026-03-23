"use client";

import TopMenuItem from "./TopMenuItem";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu() {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const bookingTitle = isAdmin ? "All Booking" : "My Booking";

  return (
    <div className="h-[50px] bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-[30] border-b border-slate-200 shadow-sm flex flex-row justify-between items-center px-2">
      {/* Left group: Home + session-based items */}
      <div className="flex flex-row items-center gap-2">
        <TopMenuItem title="Home" pageRef="/" />
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="w-[120px] h-[100%] flex items-center justify-center text-center font-sans text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
            >
              Sign-Out
            </button>
            <TopMenuItem title={bookingTitle} pageRef="/mybooking" />
          </>
        ) : (
          <>
            <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
            <TopMenuItem title="Register" pageRef="/register" />
          </>
        )}
      </div>

      {/* Right group: Booking only */}
      <div className="flex flex-row items-center gap-2">
        <TopMenuItem title="Booking" pageRef="/booking" />
      </div>
    </div>
  );
}