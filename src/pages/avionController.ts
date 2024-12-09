//********** Imports **********//
import express, { NextFunction, Request, Response } from "express";
import { Avion } from "../types/types";
import {
    handleGetAllAvions,
    handleGetAvionByImmat,
    handleGetAvionByFilters,
    handleDeleteAvion,
  handlePostAvion,
  handlePutAvion,
} from "../managers/avionManager";

const router = express.Router();
//********** Routes **********//

// READ MIDDLEWARE

router.get(
  "/filtres",
  async (
      request: Request,
      response: Response<Avion[] | string>,
      next: NextFunction
  ) => {
      try {
        console.log("controller")
          const params = request.query as Record<string, string | number | undefined>;
          response.status(200).json(await handleGetAvionByFilters(request, next));
      } catch (error) {
      next(error);
      }
  }
  );

router.get(
  "/",
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
);

router.get(
    "/:immatriculation",
    async (
      request: Request,
      response: Response<Avion[] | string>,
      next: NextFunction
    ) => {
      try {
        const immat = request.params.immatriculation
        response.status(200).json(await handleGetAvionByImmat(immat, next));
      } catch (error) {
        next(error);
      }
    }
  );


// CREATE MIDDLEWARE
router.post(
  "/",
  async (
    request: Request,
    response: Response<Avion[] | string>,
    next: NextFunction
  ) => {
    try {
      response.status(200).json(await handlePostAvion(request, next));
    } catch (error) {
      next(error);
    }
  }
);

// DELETE MIDDLEWARE
router.delete("/:immatriculation", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const deletedAvion = await handleDeleteAvion(request, next);
    if (!deletedAvion) {
      return response.status(404).json({ message: "Avion introuvable." });
    }

    response.status(200).json(deletedAvion); 
  } catch (error) {
    next(error);
  }
});



// UPDATE MIDDLEWARE
// Middleware PUT pour mettre à jour l'avion
router.put("/", async (request: Request, response: Response<JSON>, next: NextFunction) => {
  try {
    const updatedAvion = await handlePutAvion(request, next); // Appel à la logique de mise à jour
    response.status(200).json(updatedAvion); // Retourner l'avion mis à jour
  } catch (error) {
    next(error); // Gestion des erreurs
  }
});

export default router;