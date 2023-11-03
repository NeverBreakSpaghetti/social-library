import express from 'express'
const app = express()
const port = 3001
import {insertBook} from "./controller";

app.use(express.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/books', insertBook())

export default app