export abstract class AssociateRole {
    abstract getTitle(): string;

    abstract getIncreasingPoints(): number;

    abstract getDecreasingPoints(): number;
}

export class NewComerRole extends AssociateRole {
    getTitle(): string {
        return "New comer"
    }

    getIncreasingPoints(): number {
        return 1
    }

    getDecreasingPoints(): number {
        return 2;
    }
}