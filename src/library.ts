import {BookDto} from "./bookDto";

export default class Library {

    public add(book: BookDto){
        if(!book.title)
            throw new Error('Book not valid')
    }
}