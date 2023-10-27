import express from 'express'
const app = express()
const port = 3001

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/books', (req, res) => {
    res.status(201).json()
})