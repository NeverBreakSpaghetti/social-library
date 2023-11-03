import {Repo} from "./library";
import {BookDto} from "./bookDto";

export class InMemoryRepo implements Repo{
    save(book: BookDto): number {
        return 1;
    }

}