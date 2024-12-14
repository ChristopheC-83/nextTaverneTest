import React from "react";
import Statistiques from "./Statistiques";
import Image from "next/image";
import Buttons from "./Buttons";
import Link from "next/link";

export default function Card({ character,deleteCharacter }) {
  const URL = "https://ducompagnon.fr/la-taverne/public/images/personnages/";

  const allStat = [
    {
      stat: "Santé",
      value: character.health,
      unit: "PV",
    },
    {
      stat: "Magie",
      value: character.magic,
      unit: "PM",
    },
    {
      stat: "Puissance",
      value: character.power,
      unit: "Atk",
    },
  ];


  return (
    <div
      className={`flex flex-col border-neutral-500 border-2 w-[250px] h-[400px] rounded-xl ${character.side_name}Shadow overflow-hidden`}
    >
      <div  className="w-[250px] h-[250px] overflow-hidden">
          <Image
            src={character.from === "apiCharacters" ? `${URL}${character.image}` : character.image}
            alt={character.name}
            width={250}
            height={250}
            className="object-cover duration-300 hover:scale-105"
          />
      </div>
      <div className="p-2">
          <p className="text-xl text-center mb-2">
            <b>{character.name}</b>
          </p>
        {allStat.map((oneStat) => (
          <Statistiques
            key={oneStat.stat}
            stat={oneStat.stat}
            value={oneStat.value}
            unit={oneStat.unit}
          />
        ))}
      </div>
      <div className="flex justify-around">
      {character.side_id ? (
          <Link href={`/api-characters/${character.id}`}>
            <Buttons color="bg-green-500">Voir</Buttons>
          </Link>
        ) : (
          <Link href={`/dbCharacters-update/${character.id}`}>
            <Buttons color="bg-green-500">Modifier</Buttons>
          </Link>
        )}
        <Buttons
          color="bg-red-500"
          onClick={() => deleteCharacter(character.id)}
        >
          <p className="text-sm">Supprimer</p>
        </Buttons>
      </div>
    </div>
  );
}
