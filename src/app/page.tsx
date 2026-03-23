import Banner from "@/components/Banner";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="text-center my-8">
        <Link
          href="/campgrounds"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Campgrounds
        </Link>
      </div>
    </main>
  );
}