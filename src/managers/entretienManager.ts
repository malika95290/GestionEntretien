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

// Gestionnaire pour ajouter un nouvel entretien
export const handlePostEntretien = async (request: Request, next: NextFunction) => {
  try {
    const entretien: Entretien = {
      id: request.body.id,
      date: request.body.dateEntretien.toString(),
      description: request.body.description.toString(),
      immatriculationAvion: request.body.immatriculationAvion.toString(),
      idTechnicien: request.body.idTechnicien.toString(),
      type: ""
    };
    
    const results = await entretienModel.addOne(entretien);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de l'ajout de l'entretien.");
    } else {
      const entretienAjoute = await entretienModel.getById(entretien.id.toString());
      return entretienAjoute;
    }
  } catch (e) {
    next(e);
  }
};

// Gestionnaire pour supprimer un entretien
export const handleDeleteEntretien = async (request: Request, next: NextFunction) => {
  try {
    if (request.query.id) {
      const results = await entretienModel.delete(request.query.id.toString());

      if (results.affectedRows === 0) {
        throw new Error("Erreur lors de la suppression de l'entretien.");
      }
      const affectedRows = JSON.stringify({
        entretienSupprime: results.affectedRows,
      });
      return JSON.parse(affectedRows);
    }
  } catch (e) {
    next(e);
  }
};

// Gestionnaire pour mettre à jour un entretien
export const handlePutEntretien = async (request: Request, next: NextFunction) => {
 try {
    const params: Record<string, string | number | undefined> = {};
    if (request.query.id) params["id"] = request.query.id.toString();
    if (request.query.dateEntretien) params["dateEntretien"] = request.query.dateEntretien.toString();
    if (request.query.description) params["description"] = request.query.description.toString();
    if (request.query.immatriculationAvion) params["immatriculationAvion"] = request.query.immatriculationAvion.toString();
    if (request.query.idTechnicien) params["idTechnicien"] = request.query.idTechnicien.toString();

    const results = await entretienModel.update(params);
    if (results.affectedRows === 0) {
      throw new Error("Erreur lors de la mise à jour de l'entretien.");
    } else if (params["id"]) {
      const updatedEntretien = await entretienModel.getById(params["id"].toString());
      return updatedEntretien;
    }
  } catch (e) {
    next(e);
  }
};
