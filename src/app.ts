import express from 'express'
import {bookRouter} from "./book.router";
import {pointsCardRouter} from "./points-card.router";

const app = express()
const port = 3001

app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use('/books', bookRouter)

app.use('/cards', pointsCardRouter)

export default app