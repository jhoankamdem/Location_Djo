import React from 'react';
import { useState, useEffect } from 'react'; // importation de useState pour utiliser les hooks d'état de React
import { useParams} from 'react-router-dom';
import moment from "moment";
import axios from 'axios';

export default function UpdateContrat() {

  const params = useParams()
  
  const [locataires, setLocataires] = useState({ // Form field
      noms: '',
      prenoms: '',
      cni: '',
      status: '',
      dateDebut: "",
      dateFin: "",
      montantLoyer: '',
      telephone: '',
      numeroLogement: '',
      logement: '',
      factures: [{ancienIndex: 0, nouveauIndex: 0}],
  });

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setLocataires(values => ({
      ...values,
      [key]: value,
    }));
  }

  useEffect(() => {
    const fetchLocataires = async () => {
      try {
        const response = await axios.get(`http://location.fullstackcamer.com/locataire/${params.id}`);
        setLocataires(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocataires();
  }, []);

  function formatDate(date){
    
    return moment(date).utc().format('yyyy-MM-DD') // 2021-07-14
  }

  function handleChangeIndex(e){
    const key = e.target.id;
    const value = e.target.value;
    setLocataires({
      ...locataires,
      factures: [
        ...locataires.factures,
        {
          [key]: value,
        }
      ],
    });
    console.log(locataires);
  }

  const handleSubmit = async (event) => { // fonction appelée lors de la soumission du formulaire
    event.preventDefault(); // empêcher le comportement par défaut du formulaire
  
    try {
      const response = await axios.put(`http://location.fullstackcamer.com/locataire/${params.id}`, locataires);

      // Affichage de la réponse du serveur dans la console
      
      console.log('updateLocataire');
    } catch (error) {
      // Affichage des erreurs éventuelles dans la console
      console.log('erreur updateLocataire')

      console.error(error.message);
    }
  };

  return (
    <div className='contrat'>
      {/* Formulaire pour modifier un nouveau contrat */}
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
            value={locataires.factures?.[locataires.factures.length - 1]?.nouveauIndex}
            onChange={handleChangeIndex}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateDebut">Date de début:</label>
          <input
            id="dateDebut"
            type="date"
            value={formatDate(locataires.dateDebut)}
            onChange={handleChange}
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="dateFin">Date de fin:</label>
          <input
            id="dateFin"
            type="date"
            value={formatDate(locataires.dateFin)}
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
            required
          />
        </div>
    
        <button type="submit">Mettre a jour</button>
      </form>
    </div>
    );
    }