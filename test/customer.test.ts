import request from "supertest";

const appUrl = 'http://localhost:3001'
describe('Given an new emitted card', () => {
    let emittedCardId: string;

    beforeEach(async () => {
        const newUser = {name: "GianniReader"}
        const response = await request(appUrl).post("/cards").send(newUser)
        emittedCardId = response.body.id
    })

    describe('when deposit a book', () => {
        beforeEach(async () => {
            const newBook = {title: "GianniBarbaLunga"}
            //TODO: choose between points-card-id in header or as URI structure /cards/:id/books/
            await request(appUrl).post("/books").set({"points-card-id":emittedCardId}).send(newBook);
        })

        it('then should increase points of the points card', async () => {
            const getCardResponse = await request(appUrl).get(`/cards/${emittedCardId}`).send()

            expect(getCardResponse.body).toHaveProperty('id')
            expect(getCardResponse.body).toHaveProperty('name', 'GianniReader')
            expect(getCardResponse.body).toHaveProperty('totalPoints', 1)
        })
    })

    describe('when withdraw an existing book', () => {
        let bookId: string;

        beforeEach(async () => {
            const book = {title: "Drink beer is good for you"}
            const response = await request(appUrl).post("/books").send(book)
            bookId = response.body.id
        })

        it('should not be possible due to insufficient points', async () => {
            const response = await request(appUrl).post(`/books/${bookId}/withdraw`).set({"points-card-id": emittedCardId}).send()

            expect(response.statusCode).toBe(403)
            expect(response.body).toHaveProperty('message', 'Points insufficient')
        });
    });
})

describe('Given a points card with 5 points', () => {
    let cardId: string;

    beforeEach(async () => {
        const newUser = {name: "GianniWriter"}
        const response = await request(appUrl).post("/cards").send(newUser)
        cardId = response.body.id
        for (let i = 0; i < 5; i++) {
            await request(appUrl).post(`/cards/${cardId}/add-points`).send()
        }
    })

    describe('and a deposited book', () => {
        let bookId: string;

        beforeEach(async () => {
            const newBook = {title: "Gianni hexagonal architecture master"}
            const response = await request(appUrl).post("/books").send(newBook);
            bookId = response.body.id
        })

        describe('when withdraw a book', () => {
            beforeEach(async () => {
                await request(appUrl).post(`/books/${bookId}/withdraw`).set({"points-card-id":cardId}).send()
            })

            it('then should remove the requested book', async () => {
                const getBookResponse = await request(appUrl).get(`/books/${bookId}`).send()

                expect(getBookResponse.statusCode).toBe(404)
            });

            it('then should remove points from the points card', async () => {
                const getCardResponse = await request(appUrl).get(`/cards/${cardId}`).send()

                expect(getCardResponse.body).toHaveProperty('id')
                expect(getCardResponse.body).toHaveProperty('name', 'GianniWriter')
                expect(getCardResponse.body).toHaveProperty('totalPoints', 3)
            })
        })
    })

    describe('when withdraw a non existing book', () => {
        it('then it should not be possible', async () => {
            const response = await request(appUrl).post(`/books/notExistingId/withdraw`).set({"points-card-id":cardId}).send()

            expect(response.statusCode).toBe(404)
            expect(response.body).toHaveProperty('message', 'Book not found')
        })
    });
})