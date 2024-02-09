import {Router} from "express";
import {addPoints, emitCard} from "./points-card/points-card-controller";

export const pointsCardRouter = Router()

pointsCardRouter.post('/', emitCard)
pointsCardRouter.post('/:id/add-points', addPoints)