// avionController.ts
import express, { Request, Response, NextFunction } from 'express';
import { 
    handleGetAllAvions, 
    handleGetAvionByImmatriculation, 
    handlePostAvion, 
    handlePutAvion, 
    handleDeleteAvion 
} from '../managers/avionManager';
import { Avion } from '../types/types';

const router = express.Router();

// Récupérer tous les avions (GET)
router.get("/", async (request: Request, response: Response<Avion[] | string>, next: NextFunction) => {
    try {
        const avions = await handleGetAllAvions(request, next);
        response.status(200).json(avions);
    } catch (error) {
        next(error);
    }
});

router.get("/:immatriculation", 
    async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
        const { immatriculation } = request.params;
        try {
            const avion = await handleGetAvionByImmatriculation(immatriculation, next);
            if (!avion) {
                return response.status(404).json("Aucun avion trouvé");
            }
            response.status(200).json(avion);
        } catch (error) {
            next(error);
        }
    }
);


// Ajouter un nouvel avion (POST)
router.post("/", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
    try {
        const newAvion = await handlePostAvion(request, next);
        response.status(201).json(newAvion); // 201 pour Created
    } catch (error) {
        next(error);
    }
});

// Mettre à jour un avion (PUT)
router.put("/:immatriculation", async (request: Request, response: Response<Avion | string>, next: NextFunction) => {
    try {
        const immatriculation = request.params.immatriculation; // Récupérer l'immatriculation depuis les paramètres de l'URL
        const updatedAvion = await handlePutAvion(immatriculation, request, next);
        response.status(200).json(updatedAvion); // 200 pour OK
    } catch (error) {
        next(error);
    }
});

// Supprimer un avion (DELETE)
router.delete("/:immatriculation", async (request: Request, response: Response<{ avionSupprime: number } | string>, next: NextFunction) => {
    try {
        const immatriculation = request.params.immatriculation; // Récupérer l'immatriculation depuis les paramètres de l'URL
        const result = await handleDeleteAvion(immatriculation, next);
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
