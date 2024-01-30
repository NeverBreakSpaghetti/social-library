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
});