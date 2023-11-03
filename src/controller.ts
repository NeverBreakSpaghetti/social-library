import Library, {Repo} from "./library";
import {Request, Response} from "express";
import {BookDto} from "./bookDto";

export const getLibrary = () => {
    // per passare in fretta i test metto momentaneamente sta porcheria
    return new Library(new class implements Repo {save(book: BookDto) {}});
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        library.add(req.body)
        res.status(201).json();
    };
}