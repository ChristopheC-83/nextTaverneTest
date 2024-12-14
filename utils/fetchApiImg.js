export async function fetchApiImg() {
    try {
      const res = await fetch("https://la-taverne.ducompagnon.fr/api/images");
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des images");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error; // Propager l'erreur pour la gérer ailleurs
    }
  }