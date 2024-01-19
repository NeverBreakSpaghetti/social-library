import httpMocks from "node-mocks-http";
import {Request, Response} from "express";
import {MockRequest, MockResponse} from "node-mocks-http";
import * as PointsCard from "../../src/points-card/points-card-controller";
import {CardService} from "../../src/points-card/card-service";

jest.mock('../../src/points-card/card-service');

describe('Points Card controller tests', () => {
    let request: MockRequest<Request>
    let response: MockResponse<Response>
    beforeEach(() => {
        request = httpMocks.createRequest()
        response = httpMocks.createResponse()
    })

    describe('POST /cards', () => {
        beforeEach(() => {
            request.method = 'POST'
            request.url = '/cards'
        })

        it('should return a response with status 201 when new card is add to catalogue', async () => {
            request.body = {name: 'GianniBarbaMenoLunga'}

            PointsCard.emitCard(request, response)

            expect(CardService.prototype.add).toHaveBeenCalled()
            expect(response.statusCode).toBe(201)
        });

        it('should return a response with status 400 when try to add something else', async () => {
            request.body = {test: "this is not a username"};

            PointsCard.emitCard(request, response)

            expect(response.statusCode).toBe(400);
            expect(response._getJSONData()).toHaveProperty('message', 'user not valid')
        });
    });
});