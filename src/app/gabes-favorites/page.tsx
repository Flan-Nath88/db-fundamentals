"use client";

import { useEffect, useState } from "react";
import { type gabesFavorites } from "@/server/db/schema";

export default function GabesFavoritesPage() {
    const [favorites, setFavorites] = useState<gabesFavorites[]>([]);

    useEffect(() => {
        fetch("/api/gabes-favorites")
            .then(res => res.json())
            .then(data => setFavorites(data));
    }, []);

    return (
        <>
        {favorites.map((favorite) => (
            <div key={favorite.id} className="border-2 border-gray-300 p-4 rounded-md">
                <h2>{favorite.videoGame}</h2>
                <p>{favorite.movie}</p>
                <p>{favorite.tech}</p>
            </div>
        ))}
        </>
  )
}