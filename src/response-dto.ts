import {BookEntity} from "./book-entity";

export interface ResponseBookDto {
    id: string;
    title: string;
    author?: string;
    pages?: number;
}

export const mapBookToResponseBookDto = (book: BookEntity) : ResponseBookDto => {
    return {
        id: book['id'],
        title: book['title'],
        author: book['author'],
        pages: book['pages']
    }
}