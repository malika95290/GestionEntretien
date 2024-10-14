//********** Imports **********//
import { NextFunction, Request } from "express";
import { Technicien } from "../types/types"; // Le type Technicien devrait être défini dans types
import { technicienModel } from "../models/technicienModel"; // Le modèle de la BDD pour les techniciens
import { toJson } from "../models/function"; // Si nécessaire pour convertir les données en JSON

//********** Managers **********//

// Fonction pour récupérer tous les techniciens
export const handleGetAllTechniciens = async (request: Request, next: NextFunction) => {
  return (await technicienModel.getAll()) satisfies Technicien[];
};

// Fonction pour ajouter un technicien
export const handlePostTechnicien = async (request: Request, next: NextFunction) => {
  try {
    const technicien: Technicien = {
        id: 0,
        nom: request.body.nom.toString(),
        prenom: request.body.prenom.toString(),
        specialite: request.body.specialite.toString(),
    };
    const results = await technicienModel.addOne(technicien);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de l'ajout du technicien");
    } else {
      const technicienAjoute = await technicienModel.getById(results.insertId); // Récupère le technicien ajouté par son ID
      return technicienAjoute;
    }
  } catch (e) {
    next(e);
  }
};

// Fonction pour supprimer un technicien par ID
export const handleDeleteTechnicien = async (request: Request, next: NextFunction) => {
  try {
    if (request.query.id) {
      const results = await technicienModel.delete(parseInt(request.query.id.toString()));
      
      if (results.affectedRows === 0) {
        throw new Error("Erreur lors de la suppression du technicien");
      }
      const affectedRows = JSON.stringify({ technicienSupprime: results.affectedRows });
      return JSON.parse(affectedRows);
    } else {
      throw new Error("ID du technicien manquant");
    }
  } catch (e) {
    next(e);
  }
};

// Fonction pour mettre à jour un technicien
export const handlePutTechnicien = async (request: Request, next: NextFunction) => {
  try {
    const params: Record<string, string | number | undefined> = {};
    if (request.query.id) params["id"] = parseInt(request.query.id.toString());
    if (request.query.nom) params["nom"] = request.query.nom.toString();
    if (request.query.prenom) params["prenom"] = request.query.prenom.toString();
    if (request.query.specialite) params["specialite"] = request.query.specialite.toString();

    if (!params["id"]) {
      throw new Error("ID du technicien manquant pour la mise à jour");
    }

    const results = await technicienModel.update(params);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de la mise à jour du technicien");
    } else if (params["id"]) {
      const updatedTechnicien = await technicienModel.getById(params["id"] as number);
      return updatedTechnicien;
    }
  } catch (e) {
    next(e);
  }
};
