import {Request, Response} from "express";
import {PointsCardService} from "./points-card-service";
import {isValid, mapToPointsCardDto} from "./points-card-dto";
import {mapPointsCardToResponsePointsCardDto, ResponsePointsCardDto} from "./response-points-card-dto";

export const emitCard = (req: Request, res: Response) => {
    if (!isValid(req.body)){
        res.status(400).json({message: "user not valid"})
        return
    }

    const cardService = new PointsCardService({ //FIXME: use a real repo when available
        get: jest.fn(),
        save: jest.fn()
    })

    const pointsCardDto = mapToPointsCardDto(req.body)
    const id = cardService.generateId()
    cardService.add(id, pointsCardDto.name)

    const pointsCard = cardService.get(id)
    if (!pointsCard){
        res.status(500).json({message: "points card not added"})
        return
    }

    const responseBody: ResponsePointsCardDto = mapPointsCardToResponsePointsCardDto(pointsCard)
    res.status(201).json(responseBody)
}