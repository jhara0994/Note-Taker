const express = require('express')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const { notes } = require('./db/db.json')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./public'))

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
})

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'))
    const newNotes = req.body
    newNotes.id = uuid.v4()
    notes.push(newNotes)
    fs.writeFileSync('./db/db.json'), JSON.stringify,
    res.json(notes)
})

app.delete ('/api/notes/:id', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'))
    const delNote = notes.filter((rmvNotes) => rmvNote.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(delNote))
    res.json(delNote)
})

app.get ('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})