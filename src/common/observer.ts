export interface Observer {
    update(observed: ActionObservable): void;
}

export abstract class ActionObservable {
    private observers: Observer[] = [];
    public addObserver(observer: Observer) {
        this.observers.push(observer);
    }
    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    public execute() {}
}