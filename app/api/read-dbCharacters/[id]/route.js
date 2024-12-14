// app/api/characters/[id]/route.js
import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

// Handler pour GET un personnage spécifique
export const GET = async (req, context) => {
  const { params } = context; // Accéder à `params` depuis le contexte
  const { id } = await params; // Résoudre les paramètres dynamiques

  try {
    const character = await prisma.characters.findUnique({
      where: { id },
    });
    console.log(character);
    if (!character) {
      return NextResponse.json(
        { message: "Personnage non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ character });
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage :", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération", error: error.message },
      { status: 500 }
    );
  }
};
