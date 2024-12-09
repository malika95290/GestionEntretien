//********** Imports **********//
import { NextFunction, Request } from "express";
import { Avion } from "../types/types";
import { avionModel } from "../models/avionModel";
//import { toJson } from "../models/functions";

//********** Managers **********//
export const handleGetAllAvions = async (request: Request, next: NextFunction) => {
  return (await avionModel.getAll()) satisfies Avion[];
};

export const handleGetAvionByImmat = async (immat:string, next: NextFunction) => {
  return (await avionModel.getByImmatriculation(immat)) satisfies Avion[];
};

export const handleGetAvionByFilters = async (request: Request, next: NextFunction) => {
  const params : Record<string, string | number | undefined>={};
  if(request.query.immatriculation) params["immatriculation"]=request.query.immatriculation.toString();
  if(request.query.marque) params["marque"]=request.query.marque.toString();
  if(request.query.modele) params["modele"]=request.query.modele.toString();
  return (await avionModel.getWithFilters(params)) satisfies Avion[];
};

export const handlePostAvion = async (request: Request, next: NextFunction) => {
  try {
    const avion: Avion = {
      immatriculation: request.body.immatriculation.toString(),
      marque: request.body.marque.toString(),
      modele: request.body.modele.toString(),
    };
    const results = await avionModel.addOne(avion);
    if (results.affectedRows === 0) {
      throw new Error(
        "Erreur"
      );
    } else {
      const avionAjoute = await avionModel.getByImmatriculation(
        avion.immatriculation
      );
      return avionAjoute;
    }
  } catch (e) {
    next(e);
  }
};

export const handleDeleteAvion = async (request: Request, next: NextFunction) => {
  try {
    const { immatriculation } = request.params;

    // Vérifier que l'immatriculation est fournie
    if (!immatriculation) {
      throw new Error("L'immatriculation est requise pour supprimer un avion.");
    }

    // Appel au modèle pour supprimer l'avion
    const result = await avionModel.delete(immatriculation);

    // Vérifier si un avion a été supprimé
    if (result.affectedRows === 0) {
      throw new Error(`Aucun avion trouvé avec l'immatriculation : ${immatriculation}`);
    }

    return { message: `L'avion avec l'immatriculation ${immatriculation} a été supprimé avec succès.` };
  } catch (error) {
    next(error); // Propager l'erreur au middleware d'erreur
  }
};


// Fonction de gestion de la mise à jour de l'avion
export const handlePutAvion = async (request: Request, next: NextFunction) => {
  try {
    const { immatriculation, marque, modele } = request.body; 

    if (!immatriculation) {
      throw new Error("L'immatriculation est requise.");
    }

    const params: Record<string, string | number | undefined> = { immatriculation };

    if (marque) params["marque"] = marque;
    if (modele) params["modele"] = modele;

    const results = await avionModel.update(params); 

    if (results.affectedRows === 0) {
      throw new Error("Aucun avion trouvé avec cette immatriculation.");
    }

    return await avionModel.getByImmatriculation(immatriculation);
  } catch (error) {
    next(error); 
  }
};