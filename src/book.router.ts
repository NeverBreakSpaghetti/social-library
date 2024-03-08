import {Router} from "express";
import {getAllBooks, getBook, depositBook, withdrawBook} from "./book/book-controller";

export const bookRouter = Router()

bookRouter.post('/', depositBook)
bookRouter.post('/:id/withdraw', withdrawBook)

bookRouter.get('/:id', getBook())
bookRouter.get('/', getAllBooks())
