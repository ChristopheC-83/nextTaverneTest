"use client";

import Loading from "@/app/loading";
import Card from "@/components/card/Card";
import Title from "@/components/title/Title";
import useCharactersApiStore from "@/stores/apiCharactersStore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiCharacters() {
  // const [apiCharacters, setApiCharacaters] = useState([]);
  const { apiCharacters, setApiCharacters, deleteApiCharacter } =
    useCharactersApiStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchApiCharacters() {
    try {
      const res = await fetch(
        "https://la-taverne.ducompagnon.fr/api/personnages"
      );
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des personnages");
      }
      const data = await res.json();

      const updatedData = data.map((character) => ({
        ...character, // Copie des propriétés existantes
        from: "apiCharacters", // Ajout de la propriété `from`
      }));

      setApiCharacters(updatedData);
      // console.log(updatedData);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiCharacters.length === 0) {
      fetchApiCharacters();
      toast.info("Récupération des personnages");
    } else {
      setLoading(false);
    }
  }, [apiCharacters]);

  function deleteCharacter(id, name) {
    deleteApiCharacter(id);
    toast.success(`Suppression de ${name} effectuée avec succès`);
  }

  return (
    <div>
      <Title> La Taverne de l'API</Title>
      {/* Afficher le loader si en loading */}
      {loading && <Loading />}
      {/* Afficher l'erreur s'il y en a */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center gap-8">
        {apiCharacters.map((oneCharacter) => (
          <Card
            key={oneCharacter.id}
            character={oneCharacter}
            deleteCharacter={() =>
              deleteCharacter(oneCharacter.id, oneCharacter.name)
            }
          />
        ))}
      </div>
    </div>
  );
}
