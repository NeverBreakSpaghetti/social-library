import request from "supertest";

const appUrl = "http://localhost:3001";
describe('POST /auth/sign-in', () => {
    it('should return a response with 201 when new user with passwordHash does sign in', async () => {
        const newUser = {user: "Luca", passwordHash: "hash42"}

        const response = await request(appUrl).post("/auth/sign-in").send(newUser);

        expect(response.statusCode).toBe(201);
    });

    it('should return a response with 400 when try to sign in a malformatted user', async () => {
        const notAUser = {test: "this is not a user"};

        const response = await request(appUrl).post("/auth/sign-in").send(notAUser);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'User not valid')
    });
});