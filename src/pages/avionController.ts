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

router.get(
"/filtres",
async (
    request: Request,
    response: Response<Avion[] | string>,
    next: NextFunction
) => {
    try {
        const params = request.query as Record<string, string | number | undefined>;
        console.log(params)
        response.status(200).json(await handleGetAvionByFilters(params, next));
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
router.delete(
  "/",
  async (request: Request, response: Response<JSON>, next: NextFunction) => {
    try {
      response.status(200).json(await handleDeleteAvion(request, next));
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE MIDDLEWARE
router.put(
  "/",
  async (request: Request, response: Response<JSON>, next: NextFunction) => {
    try {
      response.status(200).json(await handlePutAvion(request, next));
    } catch (error) {
      next(error);
    }
  }
);

export default router;