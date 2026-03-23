import Link from "next/link";
import Card from "./Card";

export default function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: any }) {
  return (
    <>
      <p>Explore {campgroundsJson.count} campgrounds in our catalog</p>
      <div className="m-[20px] flex flex-row flex-wrap justify-around content-around">
        {campgroundsJson.data.map((campground: any) => (
          <Link href={`/campgrounds/${campground._id}`} key={campground._id} className="w-1/5">
            <Card
              venueName={campground.name}
              imgSrc={campground.imageUrl || "/img/cover.jpg"}
              address={campground.address}
              telephone={campground.telephone}
            />
          </Link>
        ))}
      </div>
    </>
  );
}