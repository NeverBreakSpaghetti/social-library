import request from 'supertest';

const app = "http://localhost:3001";

describe('POST /books to insert a book', () => {
    it('should response with status code 201 when insert a book not in catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        expect(response.statusCode).toBe(201);
    });
    it('should response with location header when insert a book not in catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        expect(response.header['location']).toBe('newBookLocation');
    });
    it('should response with a body with book id when insert a book not in catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        expect(response.body).toHaveProperty('id',expect.any(String));
    });
});