import request from 'supertest';
import app from "../src/app";
// import Library from "../src/library";
// import * as controller from "../src/controller";

// const libraryMock: Library = {
//     add: jest.fn()
// }
describe('POST /books', () => {
    // beforeAll(()=>{
    //     jest.spyOn(controller,'getLibrary').mockReturnValue(libraryMock);
    // })
    it('should return a response with status 201 when new book is add to catalogue', async () => {
        const newBook = {title: "Love story of a Gianni and his beer"};

        const response = await request(app).post("/books").send(newBook);

        //expect(libraryMock.add).toHaveBeenCalled(); // non riesco a testare sta roba perchè non prende lo stub
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

        expect(response.body).toHaveProperty('id', expect.any(Number));
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