import {Request, Response} from "express";
import {CardService} from "./card-service";

export const emitCard = (req: Request, res: Response) => {
    const cardService = new CardService()
    const id = cardService.generateId()
    cardService.add(id, req.body.name)
    res.status(201).send()
}