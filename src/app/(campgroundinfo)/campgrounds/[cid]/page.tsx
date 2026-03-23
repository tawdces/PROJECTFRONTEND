import { getCampground } from "@/libs/api";
import Image from "next/image";
import Link from "next/link";

export default async function CampgroundDetailPage({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  const campground = await getCampground(cid);
  const data = campground.data;

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{data.name}</h1>
      <div className="flex flex-row my-5">
        <Image
          src={data.imageUrl || "/img/cover.jpg"}
          alt="Campground Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5 text-left">
          <div>Name: {data.name}</div>
          <div>Address: {data.address}</div>
          <div>Telephone: {data.telephone}</div>
        </div>
      </div>
      <Link
        href={`/booking?campgroundId=${data._id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book this campground
      </Link>
    </main>
  );
}