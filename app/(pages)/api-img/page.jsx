"use client";

import Loading from "@/app/loading";
import Title from "@/components/title/Title";
import { fetchApiImg } from "@/utils/fetchApiImg";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ApiImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // phase 1
  // async function fetchApiImg() {
  //   try {
  //     const res = await fetch("https://la-taverne.ducompagnon.fr/api/images");
  //     if (!res.ok) {
  //       throw new Error("Erreur lors de la récupération des images");
  //     }
  //     const data = await res.json();
  //     setImages(data);
  //     // phase 1 console.log
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchApiImg();
  // }, []);
// ##############################################
  // phase 2

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await fetchApiImg();
        setImages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  return (
    <div>
      <Title>Les Images de l'API</Title>
      {/* Afficher le loader si en loading */}
      {loading && <Loading />}
      {/* Afficher l'erreur s'il y en a */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* phase 2 */}
      <div className="flex items-center justify-center flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="text-center">
            <Image
              src={image.url}
              alt={image.name}
              width={150}
              height={150}
              // unoptimized={true}
              className=" h-auto object-cover rounded-lg w-64 "
            />
            <p>{image.name}</p>
          </div>
        ))}
      </div>



    </div>
  );
}
