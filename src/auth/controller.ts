import {Request, Response} from "express";
import {isValid} from "./user-dto";

export const signIn = () => {
    return (req: Request, res: Response) => {
        if (!isValid(req.body)) {
            res.status(400).json({message: "User not valid"});
            return;
        }
        res.status(201).send()
    }
};