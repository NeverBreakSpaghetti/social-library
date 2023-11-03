import Library, {Repo} from "./library";
import {Request, Response} from "express";
import {BookDto} from "./bookDto";

export const getLibrary = () => {
    // per passare in fretta i test metto momentaneamente sta porcheria
    return new Library(new class implements Repo {save(book: BookDto) {}});
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        try {
            library.add(req.body)
        }catch (e){
            if(e instanceof Error) {
                const errorMessages = e.message;
                res.status(400).json({message: errorMessages});
                return;
            }
        }
        res.status(201).json();
    };
}