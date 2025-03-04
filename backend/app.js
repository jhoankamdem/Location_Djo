const express = require('express');
const path = require('path');


const app = express();

const tenantRoutes = require("./routes/tenant");
// const factureRoutes = require("./routes/facture");
const userRoutes = require("./routes/user");
const buildingRoutes = require('./routes/building');
const roomRoutes = require('./routes/room');
// test page result
const pageRoutes = require('./routes/page');

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
// connectDB();

app.use('/page', pageRoutes);

// Routes des locataire
app.use("/locataire", tenantRoutes);

// Routes des locataire
// app.use("/facture", factureRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/auth", userRoutes);

// route config
app.use('/config', buildingRoutes, roomRoutes);

module.exports = app;