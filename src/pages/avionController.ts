// avionController.ts
import express, { Request, Response, NextFunction } from 'express';
import { handleGetAllAvions } from '../managers/avionManager';
import { toJson, handleError } from '../models/function';
import { Avion } from '../types/types';

const router = express.Router();

// READ MIDDLEWARE
router.get("/",
    async (
        request: Request,
        response: Response<Avion[] | string>,
        next: NextFunction
    ) => {
        try {
            response.status(200).json(await handleGetAllAvions(request, next));
        } catch (error) {
            next(error);
        }
    }
)
export default router;
