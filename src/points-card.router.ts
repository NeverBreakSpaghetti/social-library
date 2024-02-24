import {Router} from "express";
import {addPoints, emitCard, getCard} from "./points-card/points-card-controller";

export const pointsCardRouter = Router()

pointsCardRouter.post('/', emitCard)
pointsCardRouter.get('/:id', getCard)
pointsCardRouter.post('/:id/add-points', addPoints)