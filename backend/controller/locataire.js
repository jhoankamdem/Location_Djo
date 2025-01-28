const Locataire = require("../models/locataire");
const Facture = require("../models/facture");

// Ajouter un nouveau locataire
const ajouterLocataire = async (req, res) => {
  
  const index = req.body.nouveauIndex;

  delete req.body._id;
  const locataire = new Locataire({ ...req.body });
  const nbMois = Math.ceil((locataire.dateFin.getTime() - locataire.dateDebut.getTime()) / (1000 * 60 * 60 * 24 * 30));

  console.log(nbMois);
  locataire.factures.push(new Facture({ancienIndex: index, nouveauIndex: index }));

  locataire.caution = locataire.montantLoyer * 2 
  locataire.montantTotal = locataire.caution + nbMois * locataire.montantLoyer;

  locataire.save()
    .then(() => res.status(201).json(locataire))
    .catch(error => res.status(400).json({error}));

  
};


// Récupérer tous les locataires
const getTousLocataires = (req, res) => {
  // try {
  //   const locataires = await Locataire.find().populate('factures');
  //   res.status(200).json(locataires);
  // } catch (err) {
  //   console.error(`Erreur dans getTousLocataires: ${err.message}`);
  //   res.status(500).json({ message: "Erreur serveur lors de la récupération des Locataires" });
  // }

  Locataire.find()
    .then((locataires) => res.status(200).json(locataires))
    .catch((error) => res.status(500).json({error: "Erreur serveur lors de la recuperation des données"}));
};

// Récupérer un locataire par son ID
const getLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findById(req.params.id).populate('factures');

    if (!locataire) {
      return res.status(404).json({ msg: "Locataire non trouvé" });
    }

    res.status(200).json(locataire);
  } catch (error) {
    console.error(`Erreur dans getLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Mettre à jour un locataire par son ID
const modifierLocataire = async (req, res) => {
//   Locataire.findOne({ _id: req.params._id})
//     .then((locataire) => {
//       const facts = req.body.factures;
//       delete req.body.factures; 

//       if(facts.length > locataire.factures.length){
//         const fac = facts[facts.length - 1];
//         fac.ancienIndex = locataire.factures[locataire.factures.length - 1].nouveauIndex;
//         locataire.factures.push(new Facture({ancienIndex: fac.ancienIndex, nouveauIndex: fac.nouveauIndex }));  
         
//       } 

//       facts = locataire.factures

//       Locataire.updateOne({_id: req.params._id}, {...req.body, _id: req.params._id, factures: facts})
//         .then((locataire) => res.status(200).json(locataire))
//         .catch((error) => res.status(401).json({error}));
      
//     })
//     .catch((error) => res.status(404).json({error}));
// };

  Locataire.findOne({ _id: req.params.id})
    .then((locataire) => {
      let facts = req.body.factures;
      delete req.body.factures; 

      if(facts.length > locataire.factures.length){
        const fac = facts[facts.length - 1];
        fac.ancienIndex = locataire.factures[locataire.factures.length - 1].nouveauIndex;
        locataire.factures.push(new Facture({ancienIndex: fac.ancienIndex, nouveauIndex: fac.nouveauIndex }));  
      } 

      facts = locataire.factures

      Locataire.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id, factures: facts})
        .then((locataire) => res.status(200).json(locataire))
        .catch((error) => res.status(401).json({error}));
    })
    .catch((error) => res.status(404).json({error}));
};
    
// Supprimer un locataire par son ID
const supprimerLocataire = async (req, res) => {
  try {
    const locataire = await Locataire.findByIdAndRemove(req.params.id);

    if (!locataire) {
    return res.status(404).json({ msg: "Locataire non trouvé" });
  }

  res.status(200).json({ msg: "Locataire supprimé avec succès" });
  } catch (error) {
    console.error(`Erreur dans supprimerLocataire: ${error.message}`);
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

//ajouter une nouvelle cellule de facture
const ajouterCelluleFacture = (req, res) => {
  // if( req.body.nouveauIndex > 0 ){
    
  //   try {
  //     const locataire = await Locataire.findById(req.params.id);
  
  //     if (!locataire) {
  //       return res.status(404).json({ msg: "Locataire non trouvé" });
  //     }
  
  //     const { date, ancienIndex, nouveauIndex, factureTotal } = req.body;
  
  //     // Ajouter la nouvelle cellule à la liste des factures existantes
  //     locataire.factures.push({ date, ancienIndex, nouveauIndex, factureTotal });
  
  
  //     const locataireModifie = await locataire.save(); 

  //     res.status(200).json(locataireModifie);
  //   } catch (error) {
  //     console.error(`Erreur dans ajouterCelluleFacture: ${error.message}`);
  //     res.status(500).json({ msg: "Erreur serveur" });
  //   }
  
  // } else {
  //   res.status(200).json({msg: "le nouvelle index ne peut pas etre 0"});
  // }

  if (req.body.nouveauIndex > 0) {
    if(req.body.nouveauIndex > req.body.ancienIndex){
      Locataire.findOne({_id: req.params.id})
      .then((locataire) => {
        locataire.factures.push({...req.body});
        locataire.save()
          .then(() => res.status(200).json(locataire))
          .catch((error) => res.status(401).json({error}));
      })
      .catch((error) => res.status(400).json({error}));
    } else {
      res.status(200).json({msg: "le nouvelle index ne peut pas etre null"});
    }
    
  } else {
    res.status(200).json({msg: "le nouvelle index ne peut pas etre null"});
  }
};


    
    
module.exports = { ajouterLocataire, getTousLocataires, getLocataire, modifierLocataire, supprimerLocataire, ajouterCelluleFacture, };
