"use client";

import Title from "@/components/title/Title";
import { fetchApiImg } from "@/utils/fetchApiImg";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DbCharactersRead({ params: paramsPromise }) {
  // phase 1
  const params = use(paramsPromise);
  // console.log(params);
  const id = params.id;
  // console.log(id);

  // phase 3
  const router = useRouter()

  // phase 2

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    health: "",
    magic: "",
    power: "",
    side_name: "",
    from:"dbCharacters"
  });

  async function fetchOneCharacterbyId(id) {
    try {
      const response = await fetch(`/api/read-dbCharacters/${id}`);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        setFormData(data.character); // Mettre à jour le formulaire avec les données du personnage
      } else {
        toast.error(
          data.message || "Erreur lors de la récupération du personnage"
        );
        router.replace("/dbCharacters-read");
      }
    } catch (err) {
      console.error(err);
      router.replace("/dbCharacters-read");
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    setFormData(fetchOneCharacterbyId(id));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const response = await fetch(`/api/update-dbCharacters`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      });
      const data = await response.json();
      // console.log("datas : ",data);

      if (response.ok) {
        toast.success("Personnage modifié avec succès !");
        router.push("/dbCharacters-read");
      } else {
        toast.error(data.message || "Erreur lors de la modification.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur s'est produite !");
    }
  };

  return (
    <div>
      <Title>Modifions {id} </Title>
      <form onSubmit={handleSubmit} className="w-[96%] mx-auto max-w-xl">
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name || ""}
          onChange={handleChange}
        />
        {images && (
          <select
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
          >
            <option value="">Choisissez votre Avatar</option>
            {images.map((image, index) => (
              <option key={index} value={image.url}>
                {image.name}
              </option>
            ))}
          </select>
        )}
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="health"
          placeholder="Santé"
          value={formData.health || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="magic"
          placeholder="Magie"
          value={formData.magic || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="power"
          placeholder="Puissance"
          value={formData.power || ""}
          onChange={handleChange}
        />
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="text"
          name="side_name"
          value={formData.side_name || ""}
          onChange={handleChange}
        >
          <option value="">Choisissez votre camp</option>
          <option value="angel">Ange</option>
          <option value="light">Lumière</option>
          <option value="dark">Coté Obscur</option>
        </select>

        <button
          type="submit"
          className="p-2 w-full text-white bg-blue-500 rounded hover:opacity-85 duration-300"
        >
          Moodifier le personnage
        </button>
      </form>

      {message && <p className="text-center mt-8 text-red-500">{message}</p>}
    </div>
  );
}
