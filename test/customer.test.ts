import request from "supertest";

const appUrl = 'http://localhost:3001'
describe.skip('Given an new emitted card', () => {
    let emittedCardId: string;

    beforeEach(async () => {
        const newUser = {name: "GianniReader"}
        const response = await request(appUrl).post("/cards").send(newUser)
        emittedCardId = response.body.id
    })

    describe('when deposit a book', () => {
        let depositResponse: request.Response

        beforeEach(async () => {
            const newBook = {title: "GianniBarbaLunga"}
            //TODO: choose between points-card-id in header or as URI structure /cards/:id/books/
            const response = await request(appUrl).post("/books").set({"points-card-id":emittedCardId}).send(newBook);
            depositResponse = response.body
        })

        it('then should have a success add points to the points card', async () => {
            expect(depositResponse).toHaveProperty('id')
            expect(depositResponse).toHaveProperty('title', 'GianniBarbaLunga')
            expect(depositResponse).toHaveProperty('points', 1)
        })
    })
})