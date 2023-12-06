import request from 'supertest';
//import app from "../src/app";
import * as controller from "../src/controller";

const app = "http://localhost:3001";
describe('POST /books', () => {

    it('should return a response with status 201 when new book is add to catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        expect(response.statusCode).toBe(201);
    });

    it('should return a response with status 400 when try to add something else', async () => {
        const notABook = {test: "this is not a book"};

        const response = await request(app).post("/books").send(notABook);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Book not valid')
    });

    it('should return a response with the book his id when new book is add to catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        expect(response.body).toHaveProperty('id', expect.any(String));
        expect(response.body).toHaveProperty('title', newBook.title);
    });
});

describe('GET /books/:id', () => {
    it('should return a response with status 404 when the book is not in catalogue', async () => {
        const bookId = 'notExistingId'

        const response = await request(app).get(`/books/${bookId}`)

        expect(response.statusCode).toBe(404);
    });
    it('should return a response with status 200 when the book is in catalogue', async () => {
        const newBook = { title: "Gianni fights for team wellness" }
        const alreadyInCatalogueBook = await request(app).post("/books").send(newBook);
        const alreadyInCatalogueBookId = alreadyInCatalogueBook.body.id;

        const response = await request(app).get(`/books/${alreadyInCatalogueBookId}`)

        expect(response.statusCode).toBe(200);
    });
});

describe('GET /books', () => {
    it.skip('should return a response with status 404 when catalogue is empty', async () => {
        const response = await request(app).get(`/books`)

        expect(response.statusCode).toBe(404);
    });
    it('should return a response with status 200 when the book is in catalogue', async () => {
        const newBook = {
            title: "Gianni DDD passionate",
            author: 'Kent Back',
            pages: 4242,
        }
        await request(app).post("/books").send(newBook);

        const response = await request(app).get(`/books`)

        expect(response.statusCode).toBe(200);
    });
});

describe('mapRequestBodyToBook', () => {
    it('should map a body with title', () => {
        const body = {title: 'Gianni Dungeon Master'}

        expect(controller.mapRequestBodyToBookDto(body)).toEqual({title: 'Gianni Dungeon Master'})
    });
    it('should map a body with all book fields', () => {
        const body = {title: 'Gianni\'s evaluation of Klingon war tactics', author: 'Gianni', pages: 6000}

        expect(controller.mapRequestBodyToBookDto(body)).toEqual({title: 'Gianni\'s evaluation of Klingon war tactics', author: 'Gianni', pages: 6000})
    });
});