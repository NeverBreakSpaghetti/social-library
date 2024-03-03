import {PointsCardService} from "./points-card-service";
import {ActionObservable} from "../common/observer";

 export class SubtractPointsAction extends ActionObservable {
    private readonly pointsCardId: string;
    private readonly bookId: string;
    private isOperationCompleteWithSuccess: boolean | undefined;
    constructor(pointsCardId: string, bookId: string) {
        super();
        this.pointsCardId = pointsCardId
        this.bookId = bookId
    }
    override execute() {
        const service = new PointsCardService()
        try {
            service.subtractPoints(this.pointsCardId)
        } catch (e) {
            this.setActionCompleteStatus(false)
        }
        if (this.isOperationCompleteWithSuccess === undefined)
            this.setActionCompleteStatus(true)
    }

     private setActionCompleteStatus(state: boolean) {
         this.isOperationCompleteWithSuccess = state
         this.notifyObservers()
     }

    public getActionCompletionWithSuccessStatus() {
        return this.isOperationCompleteWithSuccess
    }

    public getBookId() {
        return this.bookId
    }
 }