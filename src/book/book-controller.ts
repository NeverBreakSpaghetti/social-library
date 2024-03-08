import BookService from "./book-service";
import {Request, Response} from "express";
import {BookDto, isValid} from "./book-dto";
import {mapBookArrayToResponseBookDtoArray, mapBookToResponseBookDto, ResponseBookDto} from "./response-book-dto";
import {PointsCardGateway} from "./points-card-gateway";

export const getBookService = () => {
    return new BookService();
};

export const mapRequestBodyToBookDto = (object: any): BookDto => {
    return {title: object.title, author: object.author, pages: object.pages}
};
export const depositBook = (req: Request, res: Response) => {
    if (!isValid(req.body)) {
        res.status(400).json({message: "Book not valid"});
        return;
    }

    const library = getBookService();
    const id = library.generateId();
    const book: BookDto = mapRequestBodyToBookDto(req.body)
    library.add(id, book)

    const bookEntity = library.get(id)
    if (!bookEntity) {
        res.status(500).send()
        return
    }

    const pointsCardId = req.header("points-card-id")
    if(pointsCardId){
        const pointsCardGateway = new PointsCardGateway()
        pointsCardGateway.addPoints(pointsCardId)
    }

    const responseBody: ResponseBookDto = mapBookToResponseBookDto(bookEntity)
    const location = `/books/${id}`
    res.status(201)
        .setHeader('location',location)
        .send(responseBody)
}

export const getBook = (library: BookService = getBookService()) => {
    return (req: Request, res: Response) => {
        const bookId = req.params.id;
        const book = library.get(bookId);
        if (!book){
            res.status(404).send()
            return
        }
        res.status(200).send(mapBookToResponseBookDto(book))
    };
}

export const getAllBooks = (library: BookService = getBookService()) => {
    return (req: Request, res: Response) => {
        const books = library.getAllBooks();
        if (books.length === 0) {
            res.status(200).send([])
            return
        }
        res.status(200).send(mapBookArrayToResponseBookDtoArray(books))
    }
};

export const withdrawBook = (req: Request, res: Response) => {
    const pointsCardId = req.header("points-card-id")
    if(!pointsCardId){
        res.status(400).json({message: "Missing points card"})
        return
    }

    const library = getBookService();
    const bookId = req.params.id;
    const book = library.get(bookId);
    if (!book){
        res.status(404).json({message: "Book not found"})
        return
    }

    try {
        const pointsCardGateway = new PointsCardGateway()
        pointsCardGateway.subtractPoints(pointsCardId)
    } catch (e: any) {
        res.status(403).json({message: (e as Error).message});
        return
    }

    library.remove(bookId)

    res.status(200).send(mapBookToResponseBookDto(book))
}