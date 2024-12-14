import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Récupérer tous les personnages depuis la base de données
    //  avec prisma, pas de fildAll mais findMany à la place
    const characters = await prisma.characters.findMany();

    // Retourner les personnages avec un statut 200 (succès)
    return NextResponse.json({ characters }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des personnages :", error);

    // Retourner une réponse en cas d'erreur
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des personnages",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
