import {BookRepo} from "./book-repo";
import {v4 as uuid} from 'uuid';
import {BookDto} from "./book-dto";
import {BookEntity} from "./book-entity";
import inMemoryBookRepoSingletonInstance from "./inmemory-book-repo";
import { PointsCardSubject, SubtractPointsSubject} from "../points-card/observable";
import {Observer} from "../common/observer";

export default class BookService implements Observer{
    private readonly bookRepo: BookRepo
    constructor(repo?: BookRepo) {
        if (repo)
            this.bookRepo = repo
        else
            this.bookRepo = inMemoryBookRepoSingletonInstance
    }

    public add(id: string, book: BookDto): void {
        const bookEntity: BookEntity = BookEntity.create(id, book)
        this.bookRepo.save(bookEntity);
    }

    get(bookId: string): BookEntity | null {
        return this.bookRepo.get(bookId);
    }

    getAllBooks = (): BookEntity[] => {
        return this.bookRepo.getAllBooks()
    }

    generateId(): string {
        return uuid()
    }

    remove(bookId: string): void {
        this.bookRepo.remove(bookId)
    }

    removeBookWithSubject(pointsCardId: string, bookId: string) {
        const subtractSubject: SubtractPointsSubject = new SubtractPointsSubject(pointsCardId, bookId)
        subtractSubject.addObserver(this)
        subtractSubject.fireEvent() //FIXME: It should be better is it was async. It's strange create an observee and call command that can change the state
    }

    update(observed: PointsCardSubject): void {
        if (! (observed instanceof SubtractPointsSubject))
            throw new Error("Invalid event type")

        if (observed.getState() === false)
            throw new Error("Book not removed")

        this.bookRepo.remove(observed.getBookId())
    }
}