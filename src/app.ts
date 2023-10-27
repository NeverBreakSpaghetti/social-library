import express from 'express'
const app = express()
const port = 3001

app.use(express.json())
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/books', (req, res) => {
    const bookTitle = req.body['title']
    res.set('location', 'newBookLocation')
    res.status(201).json({id: '1', title: bookTitle})
})