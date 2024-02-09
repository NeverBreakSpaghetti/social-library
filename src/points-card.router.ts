import {Router} from "express";
import {emitCard} from "./points-card/points-card-controller";

export const pointsCardRouter = Router()

pointsCardRouter.post('/', emitCard)