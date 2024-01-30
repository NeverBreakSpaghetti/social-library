import express from 'express'
const app = express()
const port = 3001
import {getAllBooks, getBook, insertBook} from "./book/controller";
import {emitCard} from "./points-card/points-card-controller";

app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/books', insertBook())

app.get('/books/:id', getBook())
app.get('/books', getAllBooks())

app.post('/cards', emitCard)


export default app