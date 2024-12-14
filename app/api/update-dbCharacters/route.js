import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    // phase 1
    // Lire le corps de la requête

    const body = await req.json();

    const { id, name, image, health, magic, power, side_name, from } = body;

    console.log("body", body);

    //   phase 2

    // Validation simple
    if (!id) {
      return NextResponse.json(
        { message: "ID du personnage manquant" },
        { status: 400 }
      );
    }

    // Mise à jour dans la base de données
    const updatedCharacter = await prisma.characters.update({
      where: { id },
      data: {
        name,
        image,
        health: parseInt(health, 10),
        magic: parseInt(magic, 10),
        power: parseInt(power, 10),
        side_name,
        from,
      },
    });

    return NextResponse.json(
      { message: "Personnage modifié avec succès", updatedCharacter },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la modification du personnage :", error);

    return NextResponse.json(
      {
        message: "Erreur lors de la modification du personnage",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
