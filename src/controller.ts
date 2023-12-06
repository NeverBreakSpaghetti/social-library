import Library from "./library";
import {Request, Response} from "express";
import {InMemoryRepo} from "./inmemory-repo";
import {BookDto, isValid} from "./bookDto";
import {mapBookArrayToResponseBookDtoArray, mapBookToResponseBookDto, ResponseBookDto} from "./response-dto";

const repo = new InMemoryRepo();
export const getLibrary = () => {
    return new Library(repo);
};

export const mapRequestBodyToBookDto = (object: any): BookDto => {
    if(!isValid(object))
        throw new Error('Book not valid')
    return {title: object.title, author: object.author, pages: object.pages}
};
export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const id = library.generateId();
        try { //TODO: remove try catch
            const book: BookDto = mapRequestBodyToBookDto(req.body)
            library.add(id, book)
        }catch (e){
            if(e instanceof Error) {
                const errorMessages = e.message;
                res.status(400).json({message: errorMessages});
                return;
            }
        }

        const bookEntity = library.get(id)
        if (!bookEntity) {
            res.status(500).send()
            return
        }
        const responseBody: ResponseBookDto = mapBookToResponseBookDto(bookEntity)

        const location = `/books/${id}`
        res.status(201)
            .setHeader('location',location)
            .send(responseBody)
    };
}

export const getBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const bookId = req.url.split('books/')[1];
        const book = library.get(bookId);
        if (!book){
            res.status(404).send()
            return
        }
        res.status(200).send(mapBookToResponseBookDto(book))
    };
}

export const getAllBooks = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const books = library.getAllBooks();
        if (books.length === 0) {
            res.status(404).send()
            return
        }
        res.status(200).send(mapBookArrayToResponseBookDtoArray(books))
    }
};