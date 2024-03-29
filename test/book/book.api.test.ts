import request from 'supertest';
//import app from '../src/app'

const appUrl = 'http://localhost:3001';
describe('Customer tests', () => {
    describe('Given a new book not in catalogue', () => {
        const newBook = { title: "GianniBarbaLunga" }
        describe('when execute a deposit', () => {
            it('then should have a success and return the object inserted with id', async () => {
                const response = await request(appUrl).post("/books").send(newBook);
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
                const alreadyInCatalogueBook = await request(appUrl).post("/books").send(newBook);
                const bookId = alreadyInCatalogueBook.body.id;

                const response = await request(appUrl).get(`/books/${bookId}`);

                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('title', newBook.title);
                expect(response.body).toHaveProperty('author', newBook.author);
                expect(response.body).toHaveProperty('pages', newBook.pages);
                expect(response.body).toHaveProperty('id', bookId.toString());
            });
        });
    });

    describe('Given more books already in catalogue', () => {
        describe('when get a list of all books in catalogue', () => {
            it('should have success and return all the books', async () => {
                const newFirstBook = {
                    title: "Gianni clean code master",
                    author: "Mauro",
                    pages: 4242,
                }
                const newSecondBook = {
                    title: "Gianni clean code ninja",
                    author: "Luca",
                    pages: 1984,
                }
                const newThirdBook = {
                    title: "Gianni clean code guru",
                    author: "Giulia",
                    pages: 101,
                }
                await request(appUrl).post("/books").send(newFirstBook);
                await request(appUrl).post("/books").send(newSecondBook);
                await request(appUrl).post("/books").send(newThirdBook);

                const response = await request(appUrl).get(`/books`);

                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBeGreaterThan(0);
                expect(response.body).toMatchObject(
                    expect.arrayContaining([
                        {
                            id: expect.any(String),
                            title: "Gianni clean code master",
                            author: "Mauro",
                            pages: 4242,
                        },
                        {
                            id: expect.any(String),
                            title: "Gianni clean code ninja",
                            author: "Luca",
                            pages: 1984,
                        },
                        {
                            id: expect.any(String),
                            title: "Gianni clean code guru",
                            author: "Giulia",
                            pages: 101,
                        }
                    ]),
                );
            });
        });
    });
});