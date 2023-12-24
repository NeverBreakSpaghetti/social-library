import {Request, Response} from "express";
import {isValid} from "./user-dto";
import UserService from "./user-service";
import {UserRepo} from "./user-repo";
import {UserEntity} from "./user-entity";

const repo = new class implements UserRepo {
    save(user: UserEntity): void {}
}
export const signIn = (userService: UserService = new UserService(repo)) => {
    return (req: Request, res: Response) => {
        if (!isValid(req.body)) {
            res.status(400).json({message: "User not valid"});
            return;
        }
        userService.add(req.body) //TODO: add dto mapping
        res.status(201).send()
    }
};