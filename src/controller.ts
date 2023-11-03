import Library from "./library";
import {Request, Response} from "express";

export const getLibrary = () => {
    return new Library();
};

export const insertBook = (library: Library = getLibrary()) => {
    return (req: Request, res: Response) => {
        library.add(req.body)
        res.status(201).json();
    };
}