import request from 'supertest';

const appUrl = "http://localhost:3001";

describe('Customer tests auth', () => {
    describe('Given a new user with password hash', () => {
        describe('when registering', () => {
            it('should have success', async () => {
                const newUser = {user: "Gianni", passwordHash: "hash1234"}

                const response = await request(appUrl).post("/auth/sign-in").send(newUser);

                expect(response.statusCode).toBe(201);
            });
        });
    });
})