const express = require('express');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;

app.use(bodyParser.json());

let notes = [];
let idCounter = 1;

// Get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Get a single note by ID
app.get('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
});

// Create a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newNote = { id: idCounter++, title, content: content || '' };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Update a note by ID
app.put('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }
    const { title, content } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    res.json(note);
});

// Delete a note by ID
app.delete('/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
    if (noteIndex === -1) {
        return res.status(404).json({ message: 'Note not found' });
    }
    notes.splice(noteIndex, 1);
    res.json({ message: 'Note deleted successfully' });
});

app.listen(port, () => {
    console.log(`Notes API running on http://localhost:${port}`);
});
