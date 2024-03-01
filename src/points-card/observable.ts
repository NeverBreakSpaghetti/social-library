import {PointsCardService} from "./points-card-service";
import {Observer} from "../common/observer";

 export abstract class PointsCardSubject {
    private observers: Observer[] = [];
    public addObserver(observer: Observer) {
        this.observers.push(observer);
    }
    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    public fireEvent() {}
 }

 export class SubtractPointsSubject extends PointsCardSubject {
    private readonly pointsCardId: string;
    private readonly bookId: string;
    private isOperationCompleteWithSuccess: boolean | undefined;
    constructor(pointsCardId: string, bookId: string) {
        super();
        this.pointsCardId = pointsCardId
        this.bookId = bookId
    }
    override fireEvent() {
        const service = new PointsCardService()
        try {
            service.subtractPoints(this.pointsCardId)
        } catch (e) {
            this.setOperationCompleteStatus(false)
        }
        if (!this.isOperationCompleteWithSuccess)
            this.setOperationCompleteStatus(true)
    }

     private setOperationCompleteStatus(state: boolean) {
         this.isOperationCompleteWithSuccess = state
         this.notifyObservers()
     }

    public getOperationCompletionWithSuccessStatus() {
        return this.isOperationCompleteWithSuccess
    }

    public getBookId() {
        return this.bookId
    }
 }