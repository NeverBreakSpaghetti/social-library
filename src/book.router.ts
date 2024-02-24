import {Router} from "express";
import {getAllBooks, getBook, depositBook} from "./book/book-controller";

export const bookRouter = Router()

bookRouter.post('/', depositBook())

bookRouter.get('/:id', getBook())
bookRouter.get('/', getAllBooks())
