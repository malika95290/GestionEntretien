// Fonction toJson : transforme un objet ou une réponse SQL en JSON
export const toJson = (data: any): string => {
    try {
        return JSON.stringify(data);  // Convertit les données en chaîne JSON
    } catch (error) {
        throw new Error("Erreur lors de la conversion en JSON");
    }
};

// Fonction de gestion des erreurs dans les requêtes
export const handleError = (error: any): any => {
    console.error("Erreur détectée :", error);
    return {
        message: error.message || "Erreur interne",
        status: error.status || 500
    };
};