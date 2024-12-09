//********** Imports **********//
import express, { Request, Response, NextFunction } from 'express';
import { handleGetAllTechniciens, handlePostTechnicien, handleDeleteTechnicien, handlePutTechnicien, handleGetTechniciensById, handleGetTechniciensByFilters } from '../managers/technicienManager';
import { Technicien } from '../types/types';

const router = express.Router();

//********** Routes **********//

// Récupérer tous les techniciens
router.get("/filtres",
    async (
        request: Request,
        response: Response<Technicien[] | string>,
        next: NextFunction
    ) => {
        try {
            const params = request.query as Record<string, string | undefined>
            response.status(200).json(await handleGetTechniciensByFilters(params, next));
        } catch (error) {
            next(error);
        }
    }
);

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

router.get("/:id",
    async (
        request: Request,
        response: Response<Technicien[] | string>,
        next: NextFunction
    ) => {
        try {
            const id = parseInt(request.params.id, 10)
            response.status(200).json(await handleGetTechniciensById(id, next));
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

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await handleDeleteTechnicien(request, next);
        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

  

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
