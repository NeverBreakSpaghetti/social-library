import {ActionObservable, Observer} from "../common/observer";
import {BookRepo} from "./book-repo";
import {SubtractPointsAction} from "../points-card/observable";

export class ActionObserver implements Observer {
    constructor(private readonly bookRepo: BookRepo) {}
    update(observed: ActionObservable): void {
        if (! (observed instanceof SubtractPointsAction))
            throw new Error("Invalid action type")

        if (observed.getActionCompletionWithSuccessStatus() === false)
            throw new Error("Book not removed")

        this.bookRepo.remove(observed.getBookId())
    }
}