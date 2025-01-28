const express = require('express');
const path = require('path');
const connectDB = require("./db/connect");

const app = express();

const locataireRoutes = require("./routes/locataire");
const factureRoutes = require("./routes/facture");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware qui permet de traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connexion à la base de données MongoDB
connectDB();

// Routes des locataire
app.use("/locataire", locataireRoutes);

// Routes des locataire
app.use("/facture", factureRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;