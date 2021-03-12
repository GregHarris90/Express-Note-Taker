// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

// Store express app
const app = express();

// Create PORT
const PORT = 8000

// Data db folder db.json array (our notes)

// Setup Express to handle data parsing (app.use(express.urlencoded) & (app.use(express.json());)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup express.static to serve us our 'public' folder (css/js)
app.use(express.static('public'));

// ------------------------------------------------------------ //
// Setup Routes

// HTML GET requests

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// API GET requests

app.get('/api/notes', (req, res) => res.json(db));


// post save notes when they push "save-note" button

// app.post()

// delete note from database when they push "trash can" button















// PORT Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));