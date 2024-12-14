import prisma from "@/lib/connect";
import { nanoid } from "nanoid"; // Pour générer des IDs uniques
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // phase 1 : récupérer les données du formulaire
    const body = await req.json();

    const { id, name, image, health, magic, power, side_name, from } = body;

    console.log(body);

    // phase 2
    // Créer un personnage dans la base de données
    const character = await prisma.characters.create({
      data: {
        id,
        name,
        image,
        health: parseInt(health, 10),
        magic: parseInt(magic, 10),
        power: parseInt(power, 10),
        side_name,
        from,
      },
    });

    // Retourner une réponse avec succès
    return NextResponse.json(
      { message: "Personnage créé avec succès", character },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du personnage :", error);

    // Retourner une réponse en cas d'erreur
    return NextResponse.json(
      {
        message: "Erreur lors de la création du personnage",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
