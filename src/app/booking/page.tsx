"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getCampgrounds, createBooking } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");

  const { data: session, status } = useSession();
  const [campgrounds, setCampgrounds] = useState<any[]>([]);
  const [selectedCampground, setSelectedCampground] = useState(campgroundId || "");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCampgrounds = async () => {
  try {
    console.log('Fetching campgrounds from API...');
    const res = await getCampgrounds();
    console.log('Campgrounds data:', res);
    setCampgrounds(res.data);
    if (!campgroundId && res.data.length > 0) setSelectedCampground(res.data[0]._id);
  } catch (err: any) {
    console.error('Error fetching campgrounds:', err);
    setError(`Failed to load campgrounds: ${err.message}`);
  }
};

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status, router]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const res = await getCampgrounds();
        setCampgrounds(res.data);
        if (!campgroundId && res.data.length > 0) setSelectedCampground(res.data[0]._id);
      } catch (err) {
        setError("Failed to load campgrounds");
      }
    };
    fetchCampgrounds();
  }, [campgroundId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampground || !bookingDate) {
      setError("Please select campground and date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createBooking(selectedCampground, bookingDate.toISOString(), session!.user.token);
      router.push("/mybooking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Booking</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedCampground}
            onChange={(e) => setSelectedCampground(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a campground</option>
            {campgrounds.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <DateReserve value={bookingDate} onChange={setBookingDate} />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </main>
  );
}