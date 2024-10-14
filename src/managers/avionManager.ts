//********** Imports **********//
import { NextFunction, Request } from "express";
import { Avion } from "../types/types";
import { avionModel } from "../models/avionModel";

//********** Managers **********//

// Gestionnaire pour récupérer tous les avions
export const handleGetAllAvions = async (request: Request, next: NextFunction) => {
  return (await avionModel.getAll()) satisfies Avion[];
};

export const handleGetAvionByImmatriculation = async (immatriculation: string, next: NextFunction) => {
    console.log(`Recherche de l'avion avec immatriculation: ${immatriculation}`); // Ajout de log
    try {
        const avion = await avionModel.getByImmatriculation(immatriculation);
        console.log(avion); // Log des résultats de la requête
        return avion[0]; // Retourne le premier élément si trouvé
    } catch (error) {
        next(error);
    }
};

// Gestionnaire pour ajouter un nouvel avion
export const handlePostAvion = async (request: Request, next: NextFunction) => {
  try {
    const avion: Avion = {
      immatriculation: request.body.immatriculation?.toString() || "", // Vérification
      marque: request.body.marque?.toString() || "", // Vérification
      modele: request.body.modele?.toString() || "", // Vérification
    };
    const results = await avionModel.addOne(avion);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de l'ajout de l'avion");
    } else {
      const avionAjoute = await avionModel.getByImmatriculation(avion.immatriculation);
      return avionAjoute;
    }
  } catch (e) {
    next(e);
  }
};

// Gestionnaire pour supprimer un avion
export const handleDeleteAvion = async (immatriculation: string, next: NextFunction) => {
  try {
    const results = await avionModel.delete(immatriculation);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de la suppression de l'avion");
    }
    return { avionSupprime: results.affectedRows };
  } catch (e) {
    next(e);
  }
};

// Gestionnaire pour mettre à jour un avion
export const handlePutAvion = async (immatriculation: string, requestBody: any, next: NextFunction) => {
  try {
    const params: Record<string, string | number | undefined> = {
      immatriculation,
      ...(requestBody.marque ? { marque: requestBody.marque.toString() } : undefined), // Vérification
      ...(requestBody.modele ? { modele: requestBody.modele.toString() } : undefined), // Vérification
    };

    const results = await avionModel.update(params);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de la mise à jour de l'avion");
    } else {
      const updatedAvion = await avionModel.getByImmatriculation(params["immatriculation"]?.toString() || "");
      return updatedAvion;
    }
  } catch (e) {
    next(e);
  }
};
