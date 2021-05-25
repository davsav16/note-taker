const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./data/notes')

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id) [0];
    return result;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.title !== 'string') {
        return false;
    }
    return true;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    
    return note;
}

app.get('/api/notes', (req, res) => {
    // let results = notes;
    // if (req.query) {
    //     results = filterByQuery(req.query, results)
    // };
    res.json(notes);
});

app.get('/api/notes:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    // if any data in the req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else {
        const note =createNewNote(req.body, notes);
        res.json(note);
    }
});

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});