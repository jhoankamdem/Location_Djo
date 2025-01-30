import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Facturation() {

  const [messages, setMessages] = useState([])
  const [data, setData] = useState([]);

  
  const [totalMontant, setTotalMontant] = useState(0);

  // Récupérer les données de votre base de données lors du montage du composant
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/locataire');
      setData(response.data);
    }
    fetchData();
  }, []);


  

  // Mettre à jour le montant total pour une ligne spécifique lors de la saisie du nouvel index
  function handleNouvelleIndexChange(row, nouvelleIndex) {
    const ancienIndex = Number(row.factures?.[row.factures.length - 1]?.nouveauIndex); //Force le formatage en nombre
    const quantite = nouvelleIndex - ancienIndex; //Force le formatage en nombre
    // const qwt = 125;
    // const total = (quantite * qwt) + 2000 + 200;
    const x = ["T06","T09"];
    const qwt = x.includes(row.numeroLogement) ? 75 : 125;
    const studio = ["S01", "S02", "S03", "S04", "S05", "S06"];
    const total = studio.includes(row.numeroLogement) ? 3000 : (quantite * qwt) + 2000 + 200;

    const updatedRow = { ...row, nouvelleIndex: Number(nouvelleIndex), quantite, total };
    const updatedData = [...data];
    const rowIndex = updatedData.indexOf(row);
    updatedData[rowIndex] = updatedRow;
    setData(updatedData);
  }

  async function saveData() {
    for (const locataire of data){
      try {
      // Parcourir tous les locataires
      
        
        const ancienIndex = Number(locataire.factures?.[locataire.factures.length - 1]?.nouveauIndex); // Récupérer le dernier index enregistré comme ancien index de cette facture
        const date = new Date(); // Récupérer la date actuelle
        const nouveauIndex = locataire.nouvelleIndex; // Récupérer le nouvel index saisi par l'utilisateur
        const factureTotal =  locataire.total;
        // Envoyer une requête POST à l'API pour ajouter une nouvelle cellule de facture pour ce locataire
        const response = await axios.post(`http://localhost:5000/locataire/${locataire._id}`, { date, ancienIndex, nouveauIndex, factureTotal});
  
        // Mettre à jour les données locales avec les données renvoyées par l'API
        const updatedLocataire = response.data;
        const updatedData = [...data];
        const rowIndex = updatedData.findIndex(row => row._id === updatedLocataire._id);
        updatedData[rowIndex] = updatedLocataire;
        setData(updatedData);
      } catch (error) {
      console.error(`Erreur lors de l'enregistrement des données : ${error.message}`);
      }
    }
    
    
  }
  
  




  // telecharger la page en pdf
  function handleDownload() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1189, 841]
    });
  
    let dataForPdf = [];
  
    data.forEach((row) => {
      let newRow = [
        row.numeroLogement,
        row.noms,
        row.telephone,
        Number(row.factures?.[row.factures.length - 1]?.nouveauIndex), //Force le formatage en nombre
        Number(row.nouvelleIndex) || "", //Force le formatage en nombre
        row.quantite || "",
        "125",
        "2000",
        row.total || ""
      ];
      dataForPdf.push(newRow);
    });
  
    // Ajout de la variable totalMontant à la dernière ligne du tableau
    dataForPdf.push(["","", "", "", "", "","","total Facture", totalMontant  ]);
  
    doc.autoTable({
      head: [['N°', 'Locataire', 'N° Telephone', 'Ancien Index', 'Nouvel Index', 'Quantité', 'Qwt', 'Gardinage','Total' ]],
      body: dataForPdf
    });
  
    // Ajout de la date actuelle au nom du fichier PDF
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const fileName = `facturation (${dateString}).pdf`;
  
    doc.save(fileName);
  }
  
  
  useEffect(() => {
    let total = 0;
    data.forEach((row) => {
      if (row.total) {
        total += row.total;
      }
    });
    setTotalMontant(total);
  }, [data]);

  return (
    <div className="facturation">
      <table id='table-data'>
        <thead>
          <tr>
            <th>N°</th>
            <th>Locataire</th>
            <th>N° Telephone</th>
            <th>Ancien Index</th>
            <th>Nouvel Index</th>
            <th>quantité </th>
            <th>Qwt</th>
            <th>Gardinage</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td> {row.numeroLogement}</td>
              <td>{row.noms}</td>
              <td>{row.telephone}</td>
              <td>{Number(row.factures?.[row.factures.length - 1]?.nouveauIndex)}</td>
              <td>
                <input
                  type="number"
                  value={row.nouvelleIndex || ''}
                  onChange={(e) => handleNouvelleIndexChange(row, e.target.value)}
                  />
                  </td>
                  <td>{row.quantite}</td>
                  <td>125</td>
                  <td>2000</td>
                  <td><b>{row.total}</b></td>
                  </tr>
                  ))}
                  </tbody>
                  <tfoot>
                  <tr>
                  <td colSpan="8"> <b> Montant total: </b></td>
                  <td><b>{totalMontant}</b></td>
                  </tr>
                  </tfoot>
                  </table>
                  <div className='fontbouton'>
                    <button onClick={saveData}>Enregistrer</button>
                    <button onClick={handleDownload}>Télécharger en PDF</button>
                  </div>
                  </div>
      );}
