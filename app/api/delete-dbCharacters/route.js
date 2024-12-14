import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    // Lire le corps de la requête
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID du personnage manquant" },
        { status: 400 }
      );
    }

    // Supprimer le personnage dans la base de données
    const deletedCharacter = await prisma.characters.delete({
      where: { id },
    });

    // Retourner une réponse avec succès
    return NextResponse.json(
      { message: "Personnage supprimé avec succès", deletedCharacter },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du personnage :", error);

    return NextResponse.json(
      { message: "Erreur lors de la suppression du personnage", error: error.message },
      { status: 500 }
    );
  }
};