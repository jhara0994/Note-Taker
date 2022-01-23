const { ENGINE_METHOD_ALL } = require('constants')
const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

const {notes} = require('./db/db.json')

function createNote (body, notesArray) {
    const note = body
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirnam, './db/db.json'),
        JSON.stringify({notes : notesArray}, null, 2)
    );
    return note
}

function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
    return true
}

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Please format the note correctly!')
    } else {
        const note = createNote(req.body, notes)

        res.json(note)
    }
})