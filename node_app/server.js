// On va lancer un serveur

// Dépendance
const express = require('express');

// Variables
const PORT = 666;
const HOST = '0.0.0.0';

// App
const app = express();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Lancement du serveur
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});