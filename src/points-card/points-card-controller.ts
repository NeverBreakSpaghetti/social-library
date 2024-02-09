import {Request, Response} from "express";
import {PointsCardService} from "./points-card-service";
import {isValid, mapToPointsCardDto} from "./points-card-dto";
import {mapPointsCardToResponsePointsCardDto, ResponsePointsCardDto} from "./response-points-card-dto";
import {InMemoryPointsCardRepo} from "./inmemory-points-card-repo";

const pointsCardRepo = new InMemoryPointsCardRepo() //TODO: add a test to document that is always used the same repo every api call

export const emitCard = (req: Request, res: Response) => {
    if (!isValid(req.body)){
        res.status(400).json({message: "user not valid"})
        return
    }

    const cardService = new PointsCardService(pointsCardRepo)

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

export const addPoints = (req: Request, res: Response) => {
    const cardService = new PointsCardService(pointsCardRepo)
    cardService.addPoints(req.params.id)
}
