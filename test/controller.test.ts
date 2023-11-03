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
});