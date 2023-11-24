import Library from "./library";
import {Request, Response} from "express";
import {InMemoryRepo} from "./inmemory-repo";
import {Book, isValidBook} from "./book";

const repo = new InMemoryRepo();
export const getLibrary = () => {
    return new Library(repo);
};

export const mapRequestBodyToBook = (body: any): Book => {
    if(!isValidBook(body))
        throw new Error('Book not valid')
    return {title: body.title, author: body.author, pages: body.pages}
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        let newBookId;
        try {
            const id = library.generateId();
            const book: Book = mapRequestBodyToBook(req.body)
            newBookId = library.add(id, book)
        }catch (e){
            if(e instanceof Error) {
                const errorMessages = e.message;
                res.status(400).json({message: errorMessages});
                return;
            }
        }
        const responseBody = {
            id: newBookId,
            title: req.body.title
        }
        const location = `/books/${newBookId}`
        res.status(201)
            .setHeader('location',location)
            .send(responseBody)
    };
}

export const getBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        const bookId = req.url.split('books/')[1];
        try {
            const book = library.get(bookId)
            res.status(200).send(book)
        }catch (e) {
            res.status(404).send()
        }
    };
}

export const getAllBooks = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        try {
            library.getAllBooks();
        } catch (e) {
            res.status(404).send()
        }
        res.status(200).send()
    }
};