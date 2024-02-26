import BookService from "./book-service";
import {Request, Response} from "express";
import {BookDto, isValid} from "./book-dto";
import {mapBookArrayToResponseBookDtoArray, mapBookToResponseBookDto, ResponseBookDto} from "./response-book-dto";
import {PointsCardService} from "../points-card/points-card-service";

export const getBookService = () => {
    return new BookService();
};

export const mapRequestBodyToBookDto = (object: any): BookDto => {
    return {title: object.title, author: object.author, pages: object.pages}
};
export const depositBook = (library: BookService = getBookService()) => {
    return (req: Request, res: Response) => {
        if (!isValid(req.body)) {
            res.status(400).json({message: "Book not valid"});
            return;
        }

        const id = library.generateId();
        const book: BookDto = mapRequestBodyToBookDto(req.body)
        library.add(id, book)

        const bookEntity = library.get(id)
        if (!bookEntity) {
            res.status(500).send()
            return
        }

        const pointsCardId =req.header("points-card-id") //FIXME: find a not coupled way to communicate with points-card
        if(pointsCardId){
            const pointsCardService = new PointsCardService();
            pointsCardService.addPoints(pointsCardId)
        }

        const responseBody: ResponseBookDto = mapBookToResponseBookDto(bookEntity)
        const location = `/books/${id}`
        res.status(201)
            .setHeader('location',location)
            .send(responseBody)
    };
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

export const withdrawBook = (library: BookService = getBookService()) => {
    return (req: Request, res: Response) => {
        //////////// FIXME: find a not coupled way to communicate with points-card
        const pointsCardId = req.header("points-card-id")
        if(!pointsCardId){
            res.status(400).json({message: "Missing points card"})
            return
        }
        // const pointsCardService = new PointsCardService();
        // try {
        //     pointsCardService.subtractPoints(pointsCardId) // TODO: discuss this. Is better communicate with points card service here or in service? (maybe in service because when will exists a not coupled way to communicate the business logic should be in service)
        // } catch (e: any) {
        //     res.status(403).json({message: (e as Error).message});
        //     return
        // }
        //////////////////////////////////////////////////////////////////////////

        const bookId = req.params.id;
        const book = library.get(bookId);
        if (!book){ // TODO: discuss this. checking if book exists here i can avoid to check it in service or repository assuming that the command is fired only on existing book
            res.status(404).send({message: "Book not found"})
            return
        }

        // library.remove(bookId)
        try {
            library.removeBookWithEvent(pointsCardId, bookId)
        } catch (e: any) {
            res.status(403).send({message: "Points insufficient"})
            return
        }

        res.status(200).send(mapBookToResponseBookDto(book))
    }
}