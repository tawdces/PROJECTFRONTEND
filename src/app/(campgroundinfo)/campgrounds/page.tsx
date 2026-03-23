import CampgroundCatalog from "@/components/CampgroundCatalog";
import { getCampgrounds } from "@/libs/api";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function CampgroundsPage() {
  const campgrounds = await getCampgrounds();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Select Your Desired Campground</h1>
      <Suspense fallback={<LinearProgress />}>
        <CampgroundCatalog campgroundsJson={campgrounds} />
      </Suspense>
    </main>
  );
}