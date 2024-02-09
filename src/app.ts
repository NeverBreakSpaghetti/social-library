import express from 'express'
import {emitCard} from "./points-card/points-card-controller";
import {bookRouter} from "./book.router";

const app = express()
const port = 3001

app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use('/books', bookRouter)

app.use('/cards', emitCard)

export default app