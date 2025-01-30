// IMPORT DE COMPOSANT ET API
import React from 'react';
import { Routes, Route } from "react-router-dom";

// IMPORT POUR PAGE
import Menu from "./components/menu"; // Composant pour le menu en haut de la page
import SideMenu from "./components/sideMenu"; // Composant pour le menu latéral
import Home from "./pages/home"; // Page d'accueil
import Facturation from './pages/facturation.js'; // Page de facturation
import Contrat from './pages/contrat'; // Page de contrat
import Locataire from './pages/locataire'; // Page de locataire
import UpdateContrat from './pages/updateContrat'; //page de modification du locataire
import Divers from './pages/divers'; // Page pour les informations diverses

// IMPORT CSS
import './App.css';
import './css/menu.css'
import './css/sideMenu.css'
import './css/home.css'
import './css/facturation.css'
import './css/contrat.css'
import './css/locataire.css'
import './css/divers.css'

function App() {
  
     // Le contenu à rendre
     return (
      <div className="dashboard">
        <nav className="menu">
          <SideMenu /> {/* Insertion du composant SideMenu dans la barre de navigation */}
        </nav>
        <main className="content">
          <header>
            <Menu /> {/* Insertion du composant Menu dans l'en-tête */}
      
          </header>
          <Routes>
            {/* Définition des routes pour les différentes pages */}
            <Route path ="/" element = {<Home />} /> {/* Route pour la page d'accueil */}
            <Route path ="/facture" element = {<Facturation />} /> {/* Route pour la page de facturation */}
            <Route path ="/contrat" element = {<Contrat />} /> {/* Route pour la page de contrat */}
            <Route path ="/locataire" element = {<Locataire />} /> {/* Route pour la page de locataire */}
            <Route path ="/locataire/:id" element = {<UpdateContrat />} /> {/* Route pour la page de locataire */}
            <Route path ="/divers" element = {<Divers />} /> {/* Route pour la page des informations diverses */}
          </Routes> 
        </main>
      </div>
    );
}

export default App;

