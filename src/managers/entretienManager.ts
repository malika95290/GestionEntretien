//********** Imports **********//
import { NextFunction, Request } from "express";
import { Entretien } from "../types/types";
import { entretienModel } from "../models/entretienModel"; 
import { toJson } from "../models/function";

//********** Managers **********//

// Gestionnaire pour récupérer tous les entretiens
export const handleGetAllEntretiens = async (request: Request, next: NextFunction) => {
  return (await entretienModel.getAll()) satisfies Entretien[];
};

export const handleGetEntretiensById = async (id:string, next: NextFunction) => {
  return (await entretienModel.getById(id)) satisfies Entretien[];
};

export const handleGetEntretiensByFilters = async (
  params: Record<string, string | number | undefined>,
  next: NextFunction
) => {
  try {
    const filteredParams: Record<string, string | number> = {};
    if (params.id) filteredParams["id"] = parseInt(params.id as string, 10);
    if (params.idtechnicien) filteredParams["idtechnicien"] = parseInt(params.idtechnicien as string, 10);
    if (params.immatriculation) filteredParams["immatriculation"] = params.immatriculation.toString().trim();
    if (params.dateEntretien) filteredParams["dateEntretien"] = params.dateEntretien.toString().trim();
    if (params.remarque) filteredParams["remarque"] = params.remarque.toString().trim();
    if (params.typeEntretien) filteredParams["typeEntretien"] = params.typeEntretien.toString().trim();

    return (await entretienModel.getWithFilters(filteredParams)) satisfies Entretien[];
  } catch (error) {
    next(error);
  }
};

// Gestionnaire pour ajouter un nouvel entretien
export const handlePostEntretien = async (request: Request, next: NextFunction) => {
  try {
      const body = request.body;

      // Vérification des champs obligatoires
      if (!body.idTechnicien || !body.immatriculation || !body.dateEntretien || !body.remarque || !body.typeEntretien) {
          throw new Error("Tous les champs obligatoires doivent être fournis.");
      }

      // Préparation de l'objet Entretien
      const entretien: Entretien = {
          idTechnicien: body.idTechnicien,
          immatriculation: body.immatriculation,
          dateEntretien: body.dateEntretien, // Assurez-vous que la date est au format "YYYY-MM-DD"
          remarque: body.remarque,
          typeEntretien: body.typeEntretien,
      };

      // Ajouter l'entretien en base de données via le modèle
      const newEntretien = await entretienModel.addOne(entretien);

      // Retourner l'entretien ajouté
      return newEntretien;

  } catch (e) {
      next(e); // Gestion des erreurs
  }
};


export const handleDeleteEntretien = async (request: Request, next: NextFunction) => {
  try {
      const id = parseInt(request.params.id); // Récupérer l'ID depuis les paramètres
      if (!id) {
          throw new Error("ID de l'entretien manquant ou invalide.");
      }

      const results = await entretienModel.delete(id);
      if (results.affectedRows === 0) {
          throw new Error("Erreur : aucun entretien supprimé (ID introuvable).");
      }

      return { message: `L'entretien ayant l'id : ${id} a été supprimé.` }; // Message de succès
  } catch (error) {
      next(error); // Passe l'erreur pour qu'elle soit gérée
  }
};


// Gestionnaire pour mettre à jour un entretien
export const handlePutEntretien = async (request: Request, next: NextFunction) => {
  try {
    const { id, idTechnicien, immatriculation, dateEntretien, remarque, typeEntretien } = request.body; // Paramètres dans le corps de la requête

    // Vérifier que l'ID est présent
    if (!id) {
      throw new Error("L'id de l'entretien est requis.");
    }

    // Préparation des paramètres à mettre à jour
    const params: Record<string, string | number | undefined> = { id };

    if (idTechnicien) params["idTechnicien"] = idTechnicien;
    if (immatriculation) params["immatriculation"] = immatriculation;
    if (dateEntretien) params["dateEntretien"] = dateEntretien;
    if (remarque) params["remarque"] = remarque;
    if (typeEntretien) params["typeEntretien"] = typeEntretien;

    // Mise à jour dans la base de données
    const results = await entretienModel.update(params);

    // Vérifier si des lignes ont été affectées
    if (results.affectedRows === 0) {
      throw new Error("Aucun entretien trouvé avec cet id.");
    }

    // Retourner l'entretien mis à jour
    return await entretienModel.getById(id);
  } catch (error) {
    next(error); // Propager l'erreur au middleware d'erreur
  }
};

