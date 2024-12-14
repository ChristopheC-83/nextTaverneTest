"use client";

import Loading from "@/app/loading";
import Card from "@/components/card/Card";
import Title from "@/components/title/Title";
import useCharactersApiStore from "@/stores/apiCharactersStore";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function oneCharacter({ params: paramsPromise }) {
  const { apiCharacters, deleteApiCharacter } = useCharactersApiStore();

  const params = use(paramsPromise);
  console.log(params);
  const id = params.id;
  console.log(id);

  const router = useRouter();

   function deleteOneCharacter(id, name) {
    deleteApiCharacter(id);
    toast.success((`Suppression de ${name} effectuée avec succès`));
    router.replace("/api-characters");
  }


  useEffect(() => {
    // si id introuvable, retour pas api-characters
    if (!apiCharacters.find((character) => character.id == id)) {
      toast.error("Personnage introuvable");
      router.replace("/api-characters");
    }
  }, []);

  return (
    <>
      <Title>Mon personnage </Title>

      <div className="flex flex-wrap justify-center gap-8">
        {apiCharacters.map(
          (oneCharacter) =>
            id == oneCharacter.id && (
              <Card
                character={oneCharacter}
                deleteCharacter={()=>deleteOneCharacter(oneCharacter.id, oneCharacter.name)}
              />
            )
        )}
      </div>
    </>
  );
}
