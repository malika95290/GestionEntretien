//********** Imports **********//
import express, { Request, Response, NextFunction } from 'express';
import { handleGetAllEntretiens, handlePostEntretien, handleDeleteEntretien, handlePutEntretien, handleGetEntretiensById, handleGetEntretiensByFilters } from '../managers/entretienManager';
import { Entretien } from '../types/types';

const router = express.Router();

//********** Routes **********//

// Récupérer tous les entretiens
router.get("/",
    async (
        request: Request,
        response: Response<Entretien[] | string>,
        next: NextFunction
    ) => {
        try {
            const entretiens = await handleGetAllEntretiens(request, next);
            response.status(200).json(entretiens);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/:id",
    async (
      request: Request,
      response: Response<Entretien[] | string>,
      next: NextFunction
    ) => {
      try {
        const id = request.params.id
        response.status(200).json(await handleGetEntretiensById(id, next));
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/filtres",
    async (
      request: Request,
      response: Response<Entretien[] | string>,
      next: NextFunction
    ) => {
      try {
        const params = request.query as Record<string, string | number | undefined>;
        const results = await handleGetEntretiensByFilters(params, next);
        response.status(200).json(results);
      } catch (error) {
        next(error);
      }
    }
  );

// Ajouter un nouvel entretien
router.post("/",
    async (
        request: Request,
        response: Response<Entretien | string>,
        next: NextFunction
    ) => {
        try {
            const newEntretien = await handlePostEntretien(request, next);
            response.status(201).json(newEntretien); // 201 pour Created
        } catch (error) {
            next(error);
        }
    }
);

// Supprimer un entretien par ID
router.delete("/",
    async (
        request: Request,
        response: Response<{ entretienSupprime: number } | string>,
        next: NextFunction
    ) => {
        try {
            const result = await handleDeleteEntretien(request, next);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

// Mettre à jour un entretien
router.put("/",
    async (
        request: Request,
        response: Response<Entretien | string>,
        next: NextFunction
    ) => {
        try {
            const updatedEntretien = await handlePutEntretien(request, next);
            response.status(200).json(updatedEntretien); // 200 pour OK
        } catch (error) {
            next(error);
        }
    }
);

export default router;
