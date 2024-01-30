import httpMocks from "node-mocks-http";
import {Request, Response} from "express";
import {MockRequest, MockResponse} from "node-mocks-http";
import * as PointsCard from "../../src/points-card/points-card-controller";
import {CardService} from "../../src/points-card/card-service";

jest.mock('../../src/points-card/card-service');
const realCardServicePrototype = CardService.prototype
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

        afterEach(() => {
            jest.clearAllMocks()
            CardService.prototype = realCardServicePrototype
        });

        it('should return a response with status 201 when new card is add to catalogue', async () => {
            CardService.prototype.get = jest.fn().mockReturnValue({id: '1234', name: 'GianniBarbaMenoLunga'})
            request.body = {name: 'GianniBarbaMenoLunga'}

            PointsCard.emitCard(request, response)

            expect(CardService.prototype.add).toHaveBeenCalled()
            expect(response.statusCode).toBe(201)
        });

        it('should return a response with status 400 when try to add something else', async () => {
            request.body = {test: "this is not a username"};

            PointsCard.emitCard(request, response)

            expect(CardService.prototype.add).not.toHaveBeenCalled()
            expect(response.statusCode).toBe(400);
            expect(response._getJSONData()).toHaveProperty('message', 'user not valid')
        });

        it('should return the points card data when created', () => {
            CardService.prototype.get = jest.fn().mockReturnValue({id: '1234', name: 'GianniExBarbaLunga'})
            request.body = {name: 'GianniExBarbaLunga'}

            PointsCard.emitCard(request, response)

            expect(response._getJSONData()).toHaveProperty('id', '1234')
            expect(response._getJSONData()).toHaveProperty('name', 'GianniExBarbaLunga')
        });

        it('should return a response with status 500 when the added points card is not present', () => {
            CardService.prototype.get = jest.fn().mockReturnValue(undefined)
            request.body = {name: 'TheDDDMaster'}

            PointsCard.emitCard(request, response)

            expect(CardService.prototype.add).toHaveBeenCalled()
            expect(response.statusCode).toBe(500)
            expect(response._getJSONData()).toHaveProperty('message', 'points card not added')
        });
    });
});