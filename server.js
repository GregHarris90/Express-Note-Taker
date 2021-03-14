// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Store express app
const app = express();

// Create PORT
const PORT = process.env.PORT || 8001;

// Setup Express to handle data parsing (app.use(express.urlencoded) & (app.use(express.json());)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup express.static to serve us our 'public' folder (css/js)
app.use(express.static('public'));

// HTML/API Routes

// HTML GET requests

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// API GET request

app.get('/api/notes', (req, res) => res.json(JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'))));

// POST request to save new notes to db.json array

app.post('/api/notes', (req, res) => {
    // stores user's note in newNote object
    const addNote = req.body;
    // reads data from db.json, parses it and stores json object in currentNotes
    const currentNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'));

    // push newNote object into currentNotes array
    currentNotes.push(addNote);

    // make currentNotes object back into json string
    const newNotes = JSON.stringify(currentNotes);

    // write json string to the db.json file
    fs.writeFileSync(path.join(__dirname, './db/db.json'), newNotes);


    // log newNote, currentNotes, newNotes
    console.log('new Note:', addNote);
    console.log('current Notes:', currentNotes);
    console.log('new Notes Array:', newNotes);

    // responds with json newNote
    res.json(addNote);
    
});


// DELETE request to remove notes from db.json array

// app.delete('api/notes/:id',)


// PORT Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));