import Library from "./library";
import {Request, Response} from "express";
import {InMemoryRepo} from "./inmemory-repo";
import {BookDto, isValid} from "./bookDto";

const repo = new InMemoryRepo();
export const getLibrary = () => {
    return new Library(repo);
};

export const mapRequestBodyToBook = (body: any): BookDto => {
    if(!isValid(body))
        throw new Error('Book not valid')
    return {title: body.title, author: body.author, pages: body.pages}
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const id = library.generateId();
        try { //TODO: remove try catch
            const book: BookDto = mapRequestBodyToBook(req.body)
            library.add(id, book)
        }catch (e){
            if(e instanceof Error) {
                const errorMessages = e.message;
                res.status(400).json({message: errorMessages});
                return;
            }
        }
        const responseBody = { //TODO: extract responseBookDto
            id: id,
            title: req.body.title // cosi non gli sto veramente restituendo l'oggetto creato
        }
        const location = `/books/${id}`
        res.status(201)
            .setHeader('location',location)
            .send(responseBody)
    };
}

export const getBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const bookId = req.url.split('books/')[1];
        const book = library.get(bookId) //TODO mapping
        if (!book)
            res.status(404).send()
        res.status(200).send(book)
    };
}

export const getAllBooks = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        try {
            const books = library.getAllBooks();
            res.status(200).send(books)
        } catch (e) {
            res.status(404).send()
        }
    }
};