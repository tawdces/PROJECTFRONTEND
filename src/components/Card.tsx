"use client";

import styles from "./card.module.css";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  venueName,
  imgSrc,
  address,
  telephone,
}: {
  venueName: string;
  imgSrc: string;
  address?: string;
  telephone?: string;
}) {
  return (
    <InteractiveCard>
      <div className={styles.cardimg}>
        <Image src={imgSrc} alt="Campground Picture" fill={true} objectFit="cover" />
      </div>
      <div className={styles.cardtext}>
        <h3 className="text-xl font-semibold font-serif text-emerald-800">{venueName}</h3>
        {address && <p className="text-sm text-gray-600">{address}</p>}
        {telephone && <p className="text-sm text-gray-600">{telephone}</p>}
      </div>
    </InteractiveCard>
  );
}