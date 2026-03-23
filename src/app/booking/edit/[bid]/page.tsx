"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getBookings, updateBooking } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bid = params.bid as string;
  const { data: session, status } = useSession();
  const [booking, setBooking] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status, router]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!session?.user.token) return;
      try {
        const res = await getBookings(session.user.token);
        const found = res.data.find((b: any) => b._id === bid);
        if (found) {
          setBooking(found);
          setBookingDate(dayjs(found.bookingDate));
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError("Failed to load booking");
      }
    };
    fetchBooking();
  }, [bid, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      setError("Please select a date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateBooking(bid, bookingDate.toISOString(), session!.user.token);
      router.push("/mybooking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !booking) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Booking</h1>
        <p className="mb-4">Campground: {booking.campground.name}</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <DateReserve value={bookingDate} onChange={setBookingDate} />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Booking"}
          </button>
        </form>
      </div>
    </main>
  );
}