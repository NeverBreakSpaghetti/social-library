import httpMocks from "node-mocks-http";
import {Request, Response} from "express";
import {MockRequest, MockResponse} from "node-mocks-http";
import * as PointsCard from "../../src/points-card/points-card-controller";
import {PointsCardService} from "../../src/points-card/points-card-service";

jest.mock('../../src/points-card/points-card-service');
const realCardServicePrototype = PointsCardService.prototype
describe('Points Card controller tests', () => {
    let request: MockRequest<Request>
    let response: MockResponse<Response>
    beforeEach(() => {
        request = httpMocks.createRequest()
        response = httpMocks.createResponse()
    })

    afterEach(() => {
        jest.clearAllMocks()
        PointsCardService.prototype = realCardServicePrototype
    });

    describe('POST /cards', () => {

        beforeEach(() => {
            request.method = 'POST'
            request.url = '/cards'
        })

        it('should return a response with status 201 and the location header when new card is add to catalogue', async () => {
            PointsCardService.prototype.generateId = jest.fn().mockReturnValue('1234')
            PointsCardService.prototype.get = jest.fn().mockReturnValue({id: '1234', name: 'GianniBarbaMenoLunga'})
            request.body = {name: 'GianniBarbaMenoLunga'}

            PointsCard.emitCard(request, response)

            expect(PointsCardService.prototype.add).toHaveBeenCalled()
            expect(response.statusCode).toBe(201)
            expect(response._getHeaders()).toHaveProperty('location', '/cards/1234')
        });

        it('should return a response with status 400 when try to add something else', async () => {
            request.body = {test: "this is not a username"};

            PointsCard.emitCard(request, response)

            expect(PointsCardService.prototype.add).not.toHaveBeenCalled()
            expect(response.statusCode).toBe(400);
            expect(response._getJSONData()).toHaveProperty('message', 'user not valid')
        });

        it('should return the points card data when created', () => {
            PointsCardService.prototype.get = jest.fn().mockReturnValue({id: '1234', name: 'GianniExBarbaLunga'})
            request.body = {name: 'GianniExBarbaLunga'}

            PointsCard.emitCard(request, response)

            expect(response._getJSONData()).toHaveProperty('id', '1234')
            expect(response._getJSONData()).toHaveProperty('name', 'GianniExBarbaLunga')
        });

        it('should return a response with status 500 when the added points card is not present', () => {
            PointsCardService.prototype.get = jest.fn().mockReturnValue(null)
            request.body = {name: 'TheDDDMaster'}

            PointsCard.emitCard(request, response)

            expect(PointsCardService.prototype.add).toHaveBeenCalled()
            expect(response.statusCode).toBe(500)
            expect(response._getJSONData()).toHaveProperty('message', 'points card not added')
        });
    });

    describe('POST /cards/:id/add-points', () => {
        beforeEach(() => {
            request.method = 'POST'
            request.url = '/cards/1234/add-points'
        })

        it('should return a response with status 200 when id is valid', () => {
            PointsCardService.prototype.get = jest.fn().mockReturnValue({id: '1234', name: 'GianniBarbaCorta'})
            request.params = {id: '1234'}

            PointsCard.addPoints(request, response)

            expect(PointsCardService.prototype.addPoints).toHaveBeenCalled()
            expect(response.statusCode).toBe(200)
        });

        it('should return a response with status 404 when points card id not exists', () => {
            PointsCardService.prototype.get = jest.fn().mockReturnValue(null)
            request.params = {id: '1234'}

            PointsCard.addPoints(request, response)

            expect(PointsCardService.prototype.addPoints).not.toHaveBeenCalled()
            expect(response.statusCode).toBe(404)
            expect(response._getJSONData()).toHaveProperty('message', 'points card not found')
        });
    });
});