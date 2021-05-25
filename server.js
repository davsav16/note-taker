const express = require('express');
const { notes } = require('./data/notes')

const PORT = process.env.PORT || 3001
const app = express();


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});