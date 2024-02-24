import request from "supertest";

const appUrl = 'http://localhost:3001';

describe('Points Card customer tests', () => {
    describe('Given a new user', () => {
        const newUser = { name: "GianniBarbaMenoLunga" }
        describe('when request a new points card', () => {
            it('then should have a success and return the points points inserted with id', async () => {
                const response = await request(appUrl).post("/cards").send(newUser);
                expect(response.statusCode).toBe(201);
                expect(response.body).toHaveProperty('id');
                expect(response.body.name).toBe(newUser.name)
                expect(response.header).toHaveProperty('location', expect.any(String));
            });
        });
    });

    describe('Given an exising points card', () => {
        describe('when add points', () => {
            it('should have success and return the new total points', async () => {
                const user = { name: "Gianni braisserie visitor" }
                const existingCard = await request(appUrl).post("/cards").send(user);
                const cardId = existingCard.body.id;

                const response = await request(appUrl).post(`/cards/${cardId}/add-points`).send();

                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('totalPoints', 1);
            });
        });

        describe('when get the card', () => {
            it('should have sucess and gat the card data', async () => {
                const user = {name: "Gianni braisserie sponsor"}
                const existingCard = await request(appUrl).post("/cards").send(user);
                const cardId = existingCard.body.id;

                const response = await request(appUrl).get(`/cards/${cardId}`).send();

                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('id',expect.any(String))
                expect(response.body).toHaveProperty('name','Gianni braisserie sponsor')
                expect(response.body).toHaveProperty('totalPoints', 0)
            });
        });
    });
});