import {PointsCardService} from "../points-card/points-card-service";

export interface Observer {
        update(observed: PointsCardEventObservable): void;
 }

 export abstract class PointsCardEventObservable {
    private observers: Observer[] = [];
    public addObserver(observer: Observer) {
        this.observers.push(observer);
    }
    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    public fireEvent() {}
 }

 export class SubtractPointsEvent extends PointsCardEventObservable {
    private readonly pointsCardId: string;
    private readonly bookId: string;
    private state: boolean | undefined;
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
            this.setState(false)
        }
        if (!this.state)
            this.setState(true)
    }

     private setState(state: boolean) {
         this.state = state
         this.notifyObservers()
     }

    public getState() {
        return this.state
    }

    public getBookId() {
        return this.bookId
    }
 }