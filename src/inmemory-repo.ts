import {Repo} from "./repo";
import {BookEntity} from "./book-entity";

export class InMemoryRepo implements Repo{
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
        if(this.bookEntities.length === 0) {
            throw new Error('Catalogue is empty')
        }
        return Array.from(this.bookEntities)
    }

}