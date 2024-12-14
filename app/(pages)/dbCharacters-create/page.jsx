"use client"

import Title from '@/components/title/Title'
import { fetchApiImg } from '@/utils/fetchApiImg';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'

export default function DbCharactersCreate() {

 // fetch des images
 
 const [images, setImages] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [message, setMessage] = useState("");

    // valeurs par défaut
  const [formData, setFormData] = useState({
    id : nanoid(8),
    name: "",
    image: "",
    health: "",
    magic: "",
    power: "",
    side_name: "",
    from : "dbCharacters"
  });

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await fetchApiImg();
        console.log(data);
        setImages(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if(!formData.name || !formData.image || !formData.health || !formData.magic || !formData.power || !formData.side_name){
      setMessage("Veuillez remplir tous les champs");
      return;
    }
    


  };


  return (
    <div>
        <Title>Création d'un personnage en DB</Title>
        <form onSubmit={handleSubmit} className="w-[96%] mx-auto max-w-xl">
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
        />
        {images && <select
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="text"
          name="image"
          value={formData.side_name}
          onChange={handleChange}
        >
          <option value="">Choisissez votre Avatar</option>
          {images.map((image, index) => (
            <option key={index} value={image.url}>
              {image.name}
            </option>
          ))}
        </select>}
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="health"
          placeholder="Santé"
          value={formData.health}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="magic"
          placeholder="Magie"
          value={formData.magic}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="number"
          name="power"
          placeholder="Puissance"
          value={formData.power}
          onChange={handleChange}
        />
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          type="text"
          name="side_name"
          value={formData.side_name}
          onChange={handleChange}
        >
          <option value="">Choisissez votre camp</option>
          <option value="angel">Ange</option>
          <option value="light">Lumière</option>
          <option value="dark">Coté Obscur</option>
        </select>


        <button type="submit" className="p-2 w-full text-white bg-blue-500 rounded hover:opacity-85 duration-300">
          Créer le personnage
        </button>
      </form>
      
      {message && <p className="text-center mt-8 text-red-500">{message}</p>}
    </div>
  )
}
