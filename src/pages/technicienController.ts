//********** Imports **********//
import express, { Request, Response, NextFunction } from 'express';
import { handleGetAllTechniciens, handlePostTechnicien, handleDeleteTechnicien, handlePutTechnicien } from '../managers/technicienManager';
import { Technicien } from '../types/types';

const router = express.Router();

//********** Routes **********//

// Récupérer tous les techniciens
router.get("/",
    async (
        request: Request,
        response: Response<Technicien[] | string>,
        next: NextFunction
    ) => {
        try {
            const techniciens = await handleGetAllTechniciens(request, next);
            response.status(200).json(techniciens);
        } catch (error) {
            next(error);
        }
    }
);

// Ajouter un nouveau technicien
router.post("/",
    async (
        request: Request,
        response: Response<Technicien | string>,
        next: NextFunction
    ) => {
        try {
            const newTechnicien = await handlePostTechnicien(request, next);
            response.status(201).json(newTechnicien);
        } catch (error) {
            next(error);
        }
    }
);

// Supprimer un technicien par ID
router.delete("/",
    async (
        request: Request,
        response: Response<{ technicienSupprime: number } | string>,
        next: NextFunction
    ) => {
        try {
            const result = await handleDeleteTechnicien(request, next);
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

// Mettre à jour un technicien
router.put("/",
    async (
        request: Request,
        response: Response<Technicien | string>,
        next: NextFunction
    ) => {
        try {
            const updatedTechnicien = await handlePutTechnicien(request, next);
            response.status(200).json(updatedTechnicien);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
