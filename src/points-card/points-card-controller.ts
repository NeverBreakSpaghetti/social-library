import {Request, Response} from "express";
import {CardService} from "./card-service";

const isValid = (body: any) => {
    const keys = Object.keys(body)
    return keys.length === 1 && keys.includes('name') && body.name !== ''
}

export const emitCard = (req: Request, res: Response) => {
    if (!isValid(req.body)){
        res.status(400).json({message: "user not valid"})
        return
    }

    const cardService = new CardService()
    const id = cardService.generateId()
    cardService.add(id, req.body.name)
    res.status(201).send()
}