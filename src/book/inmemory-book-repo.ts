import {BookRepo} from "./book-repo";
import {BookEntity} from "./book-entity";

export class InMemoryBookRepo implements BookRepo{
    private bookEntities: BookEntity[] = [];
    save(book: BookEntity): void {
        this.bookEntities.push(book)
    }

    get(bookId: string): BookEntity | null {
        const bookEntity = this.bookEntities.find(bookEntity => bookEntity['id'] === bookId)
        if(!bookEntity)
            return null
        return bookEntity
    }

    getAllBooks(): BookEntity[] {
        return Array.from(this.bookEntities)
    }

}