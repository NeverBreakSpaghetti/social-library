import {Observer} from "../common/observer";
import {BookRepo} from "./book-repo";
import {PointsCardSubject, SubtractPointsSubject} from "../points-card/observable";

export class SubjectObserver implements Observer {
    constructor(private readonly bookRepo: BookRepo) {}
    update(observed: PointsCardSubject): void {
        if (! (observed instanceof SubtractPointsSubject))
            throw new Error("Invalid event type")

        if (observed.getOperationCompletionWithSuccessStatus() === false)
            throw new Error("Book not removed")

        this.bookRepo.remove(observed.getBookId())
    }
}