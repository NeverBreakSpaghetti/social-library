import {Request, Response} from "express";
import {PointsCardService} from "./points-card-service";
import {isValid, mapToPointsCardDto} from "./points-card-dto";
import {mapPointsCardToResponsePointsCardDto, ResponsePointsCardDto} from "./response-points-card-dto";
import {InMemoryPointsCardRepo} from "./inmemory-points-card-repo";

export const emitCard = (req: Request, res: Response) => {
    if (!isValid(req.body)){
        res.status(400).json({message: "user not valid"})
        return
    }

    const cardService = new PointsCardService(new InMemoryPointsCardRepo())

    const pointsCardDto = mapToPointsCardDto(req.body)
    const id = cardService.generateId()
    cardService.add(id, pointsCardDto)

    const pointsCard = cardService.get(id)
    if (!pointsCard){
        res.status(500).json({message: "points card not added"})
        return
    }

    const responseBody: ResponsePointsCardDto = mapPointsCardToResponsePointsCardDto(pointsCard)
    res.setHeader('location', `/cards/${id}`)
    res.status(201).json(responseBody)
}