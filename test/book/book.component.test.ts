import {PointsCardGateway} from "../../src/book/points-card-gateway";
import httpMocks, {MockRequest, MockResponse} from "node-mocks-http";
import {Request, Response} from "express";
import * as Library from "../../src/book/book-controller";
import {InMemoryBookRepo} from "../../src/book/inmemory-book-repo";
import {BookEntity} from "../../src/book/book-entity";

describe('Book component', () => {
    let request: MockRequest<Request>
    let response: MockResponse<Response>
    beforeEach(() => {
        request = httpMocks.createRequest()
        response = httpMocks.createResponse()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Given a book not in catalogue', () => {
        describe('And a points card', () => {
            describe('when deposit the book', () => {
                it('should add book and add points', () => {
                    const addPointsMock = jest.spyOn(PointsCardGateway.prototype, 'addPoints').mockReturnValue();
                    const book = {title: "Gianni api test estimator"}
                    const pointsCardID = 'pointsCardId'
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = book
                    request.headers = {'points-card-id': pointsCardID}

                    Library.depositBook(request, response)

                    expect(response.statusCode).toBe(201)
                    expect(addPointsMock).toBeCalledTimes(1)
                });
            })
        })
    })

    describe('Give a book not in catalogue', () => {
        describe('And not given a points card', () => {
            describe('when deposit the book', () => {
                it('should add book and not add points', () => {
                    const addPointsMock = jest.spyOn(PointsCardGateway.prototype, 'addPoints').mockReturnValue();
                    const book = {title: "Gianni api test estimator"}
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = book

                    Library.depositBook(request, response)

                    expect(response.statusCode).toBe(201)
                    expect(addPointsMock).not.toHaveBeenCalled()
                });
            })
        })
    })

    describe('Given a book in catalogue', () => {
        describe('And a points card with enough points', () => {
            describe('when withdrew a book', () => {
                it('should withdraw book and subtract points', () => {
                    const subtractPointsMock = jest.spyOn(PointsCardGateway.prototype, 'subtractPoints').mockReturnValue();
                    const getBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'get').mockReturnValue(BookEntity.create('1234',{title: 'Gianni DDD aDventures'}))
                    const removeBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'remove')
                    const pointsCardID = 'pointsCardId'
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = {id: 1234}
                    request.headers = {'points-card-id': pointsCardID}

                    Library.withdrawBook(request, response)

                    expect(response.statusCode).toBe(200)
                    expect(subtractPointsMock).toHaveBeenCalled()
                    expect(getBookRepoMock).toHaveBeenCalled()
                    expect(removeBookRepoMock).toHaveBeenCalled()

                });
            })
        })
    })

    describe('Given a book in catalogue', () => {
        describe('And a points card with NOT enough points', () => {
            describe('when withdrew a book', () => {
                it('should not withdraw book', () => {
                    const subtractPointsMock = jest.spyOn(PointsCardGateway.prototype, 'subtractPoints').mockImplementation(() => {throw new Error('Not enough points')})
                    const repoMock = jest.spyOn(InMemoryBookRepo.prototype, 'get').mockReturnValue(BookEntity.create('1234',{title: 'Gianni DDD aDventures'}))
                    const pointsCardID = 'pointsCardId'
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = {id: 1234}
                    request.headers = {'points-card-id': pointsCardID}

                    Library.withdrawBook(request, response)

                    expect(response.statusCode).toBe(403)
                    expect(response._getJSONData()).toHaveProperty('message', 'Not enough points')
                    expect(subtractPointsMock).toHaveBeenCalled()

                });
            })
        })
    })

    describe('Given a book in catalogue', () => {
        describe('And NOT a points card', () => {
            describe('when withdrew a book', () => {
                it('should not withdraw a book and not subtract points', () => {
                    const subtractPointsMock = jest.spyOn(PointsCardGateway.prototype, 'subtractPoints')
                    const getBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'get')
                    const removeBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'remove')
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = {id: 1234}

                    Library.withdrawBook(request, response)

                    expect(response.statusCode).toBe(400)
                    expect(response._getJSONData()).toHaveProperty('message', 'Missing points card')
                    expect(getBookRepoMock).not.toHaveBeenCalled()
                    expect(removeBookRepoMock).not.toHaveBeenCalled()
                    expect(subtractPointsMock).not.toHaveBeenCalled()
                });
            })
        })
    })

    describe('Given a book NOT in catalogue', () => {
        describe('And a points card', () => {
            describe('when withdrew a book', () => {
                it('should not withdraw a book and not subtract points', () => {
                    const subtractPointsMock = jest.spyOn(PointsCardGateway.prototype, 'subtractPoints').mockReturnValue()
                    const getBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'get').mockReturnValue(null)
                    const removeBookRepoMock = jest.spyOn(InMemoryBookRepo.prototype, 'remove')
                    const pointsCardID = 'pointsCardId'
                    request.method = 'POST'
                    request.url = '/books'
                    request.body = {id: 1234}
                    request.headers = {'points-card-id': pointsCardID}

                    Library.withdrawBook(request, response)

                    expect(response.statusCode).toBe(404)
                    expect(response._getJSONData()).toHaveProperty('message', 'Book not found')
                    expect(getBookRepoMock).toHaveBeenCalled()
                    expect(removeBookRepoMock).not.toHaveBeenCalled()
                    expect(subtractPointsMock).not.toHaveBeenCalled()
                });
            })
        })
    })
})