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

describe('Given a book already in catalogue', () => {
    describe('when check book\'s details', () => {
        it('should have success and return the details', async () => {
            const newBook = {
                title: "Gianni clean code master",
                author: "Mauro",
                pages: 4242,
            }
            const alreadyInCatalogueBook = await request(app).post("/books").send(newBook);
            const bookId = alreadyInCatalogueBook.body.id;

            const response = await request(app).get(`/books/${bookId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('title', newBook.title);
            expect(response.body).toHaveProperty('author', newBook.author);
            expect(response.body).toHaveProperty('pages', newBook.pages);
            expect(response.body).toHaveProperty('id', bookId.toString());
        });
    });
});