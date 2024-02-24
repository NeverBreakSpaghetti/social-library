import {Router} from "express";
import {getAllBooks, getBook, insertBook} from "./book/book-controller";

export const bookRouter = Router()

bookRouter.post('/', insertBook())

bookRouter.get('/:id', getBook())
bookRouter.get('/', getAllBooks())
