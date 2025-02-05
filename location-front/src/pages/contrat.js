import React from 'react';
import { useState } from 'react'; // importation de useState pour utiliser les hooks d'état de React
import axios from 'axios';

export default function Contrat() {
  // const [noms, setNoms] = useState('');
  // const [prenoms, setPrenoms] = useState('');
  // const [cni, setCni] = useState('');
  // const [statut] = useState('');
  // const [dateDebut, setDateDebut] = useState('');
  // const [dateFin, setDateFin] = useState('');
  // const [montantLoyer, setMontantLoyer] = useState();
  // const [telephone, setTelephone] = useState('');
  // const [numeroLogement, setNumeroLogement] = useState('');
  // const [logement, setLogement] = useState('');
  // const [nouveauIndex, setNouveauIndex] = useState('');

  const [locataires, setLocataires] = useState({ // Form field
    noms: '',
    prenoms: '',
    cni: '',
    status: 'verifier',
    dateDebut: new Date(),
    dateFin: '',
    montantLoyer: 0,
    telephone: '',
    numeroLogement: '',
    logement: '',
    nouveauIndex: 0,
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setLocataires(values => ({
      ...values,
      [key]: value,
    }));
  }


  const handleSubmit = async (event) => { // fonction appelée lors de la soumission du formulaire
    event.preventDefault(); // empêcher le comportement par défaut du formulaire

    // const nbMois = getNbMois(locataires.dateDebut, locataires.dateFin); // calculer le nombre de mois entre la date de début et la date de fin
    // const caution = 2 * locataires.montantLoyer; // calculer la caution totale en multipliant le montant du loyer par 2
    // const montantTotal = caution + (nbMois * locataires.montantLoyer); // calculer le montant total en multipliant le nombre de mois par le montant du loyer

    
    // Envoi des données au serveur API en utilisant Axios

    const defaultLacataire = { // Form field
      noms: '',
      prenoms: '',
      cni: '',
      status: 'verifier',
      dateDebut: new Date(),
      dateFin: '',
      montantLoyer: 0,
      telephone: '',
      numeroLogement: '',
      logement: '',
      nouveauIndex: 0,
    };

    
    try {
      const response = await axios.post('https://location.fullstackcamer.com/locataire', locataires);

      // Affichage de la réponse du serveur dans la console
      
      console.log('ajouterLocataire');
      setLocataires(defaultLacataire);
    } catch (error) {
      // Affichage des erreurs éventuelles dans la console
      console.log('erreur ajouterLocataire')

      console.error(error.message);
    }
  };

  // Fonction pour calculer le nombre de mois entre deux dates
  const getNbMois = (dateDebut, dateFin) => {
    // TODO: calculer le nombre de mois entre les deux dates

    const debut = new Date(dateDebut); // instanciation d'un nouvel objet Date à partir de la date de début passée en argument
    const fin = new Date(dateFin); // instanciation d'un nouvel objet Date à partir de la date de fin passée en argument
    
    const diff = fin.getTime() - debut.getTime(); // différence en millisecondes entre la date de fin et la date de début
    const mois = diff / (1000 * 60 * 60 * 24 * 30); // conversion de la différence en mois
    
    return Math.ceil(mois); // renvoyer le nombre de mois arrondi à l'entier supérieur pour éviter les décimales
  };

  return (
    <div className='contrat'>
      {/* Formulaire pour ajouter un nouveau contrat */}
      <form onSubmit={handleSubmit} className="contrat-form">
        <div className="form-group">
          <label htmlFor="noms">Noms:</label>
          <input
            id="noms"
            type="text"
            value={locataires.noms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prenoms">Prénoms:</label>
          <input
            id="prenoms"
            type="text"
            value={locataires.prenoms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cni">Cni:</label>
          <input
            id="cni"
            type="text"
            value={locataires.cni}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="logement">Logement:</label>
          <input
            id="logement"
            type="text"
            value={locataires.logement}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroLogement">Numéro du logement:</label>
          <input
            id="numeroLogement"
            type="text"
            value={locataires.numeroLogement}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Téléphone:</label>
          <input
            id="telephone"
            type="tel"
            value={locataires.telephone}
            onChange={handleChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="nouveauIndex">Index du locataire:</label>
          <input
            id="nouveauIndex"
            type="number"
            value={locataires.nouveauIndex}
            onChange={handleChange}
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateDebut">Date de début:</label>
          <input
            id="dateDebut"
            type="date"
            value={locataires.dateDebut}
            onChange={handleChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateFin">Date de fin:</label>
          <input
            id="dateFin"
            type="date"
            value={locataires.dateFin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="montantLoyer">Montant du loyer:</label>
          <input
            id="montantLoyer"
            type="number"
            value={locataires.montantLoyer}
            onChange={handleChange}
            // onChange={(event) => setMontantLoyer(parseFloat(event.target.value))}
            required
          />
        </div>
    
        <button type="submit">Ajouter</button>
      </form>
    </div>
    );
    }