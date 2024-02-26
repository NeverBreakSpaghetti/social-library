import {PointsCardSubject} from "../points-card/observable";

export interface Observer {
    update(observed: PointsCardSubject): void;
}