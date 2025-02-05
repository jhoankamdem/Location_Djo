import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [locataires, setLocataires] = useState([]);

  useEffect(() => {
    const fetchLocataires = async () => {
      try {
        const response = await axios.get('http://location.fullstackcamer.com/locataire');
        setLocataires(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocataires();
  }, []);

  const chambres = locataires.filter(locataire => locataire.logement === 'chambre' && locataire.statut);
  const studios = locataires.filter(locataire => locataire.logement === 'studio' && locataire.statut);

  const loyersEnRetard = locataires.filter(locataire => {
    const now = new Date();
    const dateFin = new Date(locataire.dateFin);
    return dateFin < now ;
  });

  const facturesNonConfirmees = locataires.filter(locataire => locataire.facture && !locataire.facture.confirme && locataire.statut);

  const deuxMoisAvantDateFin = new Date();
  deuxMoisAvantDateFin.setMonth(deuxMoisAvantDateFin.getMonth() + 2);
  const locatairesAvecDateFinDans2Mois = locataires.filter(locataire => {
    const dateFin = new Date(locataire.dateFin);
    return dateFin >= new Date() && dateFin <= deuxMoisAvantDateFin;
  });

  return (
    <section className="widgets">
      <div className="widget">
        <h2>Nombre de locataires</h2>
        <p>{locataires.length}</p>
      </div>
      <div className="widget">
        <h2>Nombre de chambres occupées</h2>
        <p>{chambres.length}</p>
      </div>
      <div className="widget">
        <h2>Nombre de studios occupés</h2>
        <p>{studios.length}</p>
      </div>
      <div className="widget">
        <h2>Loyers en retard</h2>
        <ul>
          {loyersEnRetard.map(locataire => (
            <li key={locataire._id}>
              {locataire.numeroLogement} {locataire.noms} - Date: {new Date(locataire.dateFin).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="widget">
        <h2>Factures non confirmées</h2>
        <p>{facturesNonConfirmees.length}</p>
      </div>
      <div className="widget">
        <h2>Locataires avec date de fin de bail dans 2 mois</h2>
        <ul>
          {locatairesAvecDateFinDans2Mois.map(locataire => (
            <li key={locataire._id}>
              {locataire.numeroLogement} {locataire.noms} - Date: {new Date(locataire.dateFin).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
