"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBookings, deleteBooking } from "@/libs/api";
import Link from "next/link";

export default function MyBookingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ตรวจสอบว่าเป็น admin หรือไม่ (สมมติ role = "admin")
  const isAdmin = session?.user?.role === "admin";

  const fetchBookings = async () => {
    if (!session?.user.token) return;
    try {
      const res = await getBookings(session.user.token);
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
    if (status === "authenticated") fetchBookings();
  }, [status, session, router]);

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(bookingId, session!.user.token);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  if (status === "loading" || loading) return <div>Loading...</div>;

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-6">
        {isAdmin ? "All Bookings" : "My Bookings"}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-slate-200 rounded !p-5 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{booking.campground.name}</p>
                <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Address: {booking.campground.address}</p>
                <p>Tel: {booking.campground.telephone}</p>
                {isAdmin && (
                  <p className="mt-2 text-sm text-gray-600">
                    User: {booking.user || "Unknown"}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                <Link
                  href={`/booking/edit/${booking._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}