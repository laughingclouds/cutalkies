"use client";

import { useRouter } from "next/navigation";

export function Card({ community, children, href }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(href)} className="card w-96 bg-base-100 shadow-xl shadow-secondary hover:shadow-primary mb-12 hover:cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">{community.name}</h2>
        <p>{community.about}</p>
      </div>
    </div>
  );
}