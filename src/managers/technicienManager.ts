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

export const handleGetTechniciensById = async (id: number, next: NextFunction) => {
  return (await technicienModel.getById(id)) satisfies Technicien[];
};

export const handleGetTechniciensByFilters = async (params: Record<string, string | undefined>, next: NextFunction) => {
  return (await technicienModel.getWithFilters(params)) satisfies Technicien[];
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
      const id = parseInt(request.params.id);
      if (!id) {
          throw new Error("ID du technicien manquant ou invalide");
      }

      const results = await technicienModel.delete(id);
      if (results.affectedRows === 0) {
          throw new Error("Erreur : aucun technicien supprimé (ID introuvable)");
      }

      return { message: `Le technicien ayant l'id : ${id} a été supprimé` };
    } catch (error) {
      next(error);
  }
};



export const handlePutTechnicien = async (request: Request, next: NextFunction) => {
  try {
    const { id, nom, prenom, specialite } = request.body; // Prendre les paramètres du corps de la requête

    // Vérification que l'id est présent
    if (!id) {
      throw new Error("L'id du technicien est requis.");
    }

    // Préparation des paramètres à mettre à jour
    const params: Record<string, string | number | undefined> = { id };

    if (nom) params["nom"] = nom;
    if (prenom) params["prenom"] = prenom;
    if (specialite) params["specialite"] = specialite;

    // Mise à jour dans la base de données
    const results = await technicienModel.update(params);

    // Vérifier si des lignes ont été affectées
    if (results.affectedRows === 0) {
      throw new Error("Aucun technicien trouvé avec cet id.");
    }

    // Retourner le technicien mis à jour
    return await technicienModel.getById(id);
  } catch (error) {
    next(error); // Propager l'erreur au middleware d'erreur
  }
};

