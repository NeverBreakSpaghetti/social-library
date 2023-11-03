import request from 'supertest';
import app from '../src/app'

describe('Given a new book not in catalogue', () => {
    const newBook = { title: "GianniBarbaLunga" }
    describe('when execute an insert', () => {
        it('then should have a success and return the object inserted with id', async () => {
            const response = await request(app).post("/books").send(newBook);
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newBook.title)
            expect(response.header).toHaveProperty('location')
        });
    });
});