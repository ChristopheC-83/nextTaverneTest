"use client";
import Loader from "@/app/loading";
import Card from "@/components/card/Card";
import Title from "@/components/title/Title";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DbCharactersRead() {
  const [characters, setCharacters] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  async function fetchCharacters() {
    try {
      const response = await fetch("/api/read-dbCharacters");
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des personnages");
      }
      const data = await response.json();
      setCharacters(data.characters);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function deleteDBCharacter(id) {
    try {
      const response = await fetch(`/api/delete-dbCharacters`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Personnage supprimé avec succès !");
        fetchCharacters(); // Rafraîchir la liste des personnages
      } else {
        toast.error(
          data.message || "Erreur lors de la suppression du personnage."
        );
      }
    } catch (err) {
      console.error("Erreur lors de la requête DELETE :", err);
      toast.error("Une erreur s'est produite !");
    }
  }

  return (
    <div>
      <Title>Nos personnages SupaBase</Title>

      {/* afficher le lodaer au chargement */}
      {loader && <Loader />}

      {/* Afficher l'erreur s'il y en a */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap justify-center gap-8">
        {characters.map((oneCharacter) => (
          <Card
            key={oneCharacter.id}
            character={oneCharacter}
            deleteCharacter={deleteDBCharacter}
          />
        ))}
      </div>
    </div>
  );
}
