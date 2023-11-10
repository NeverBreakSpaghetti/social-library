import Library, {Repo} from "./library";
import {Request, Response} from "express";
import {BookDto} from "./bookDto";

export const getLibrary = () => {
    // per passare in fretta i test metto momentaneamente sta porcheria
    return new Library(new class implements Repo {save(book: BookDto) {return 1}});
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        let newBookId;
        try {
            newBookId = library.add(req.body)
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
        const book = library.get(bookId);
        if(!book)
            res.status(404).send();
        res.status(200).send(book);
    };
}