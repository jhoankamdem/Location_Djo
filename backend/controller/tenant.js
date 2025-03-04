const Tenant = require("../models/Tenant");
// const Invoice = require("../models/Invoice");
const Room = require("../models/Room");
const Building = require('../models/Building');
const Account = require('../models/Account');
const Contract = require('../models/Contract');

// Ajouter un nouveau locataire
const addTenant = (req, res) => {
  
  Room.findOne({
    where: {
      id: req.body.room_id,
    },
  }).then((room) => {
    // on verifie que la piece existe
    if(!room){
      res.status(401).json({message: "cette piece n'existe pas!"});
    } else {
      // on verifie que la bonne personne qui cree le contrat
      room.getBuilding()
        .then(building => {
          if(building.user_id != req.auth.user_id){
            res.status(401).json({message: "vous n'etes pas autorise a acceder a cette page"});
          } else {
            // on cree le compte associer
            Account.create({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              phone: req.body.phone,
              cni: req.body.cni,
              deliver_on: req.body.deliver_on,
            }).then(account => {
              account.createTenant({
                payment_day: req.body.payment_day,
              }).then(tenant => {
                Contract.create({
                  room_id: room.id,
                  tenant_id: tenant.id,
                  amount: req.body.amount,
                  begin_date: req.body.begin_date,
                  end_date: req.body.end_date,
                  deposit: req.body.deposit,
                  amount: req.body.amount,
                  contract_link: '#',
                  nb_months: req.body.nb_months,
                }).then((contract) => {
                  console.log(contract);
                  res.status(201).json(tenant);
                }).catch(error => {
                  console.log(error);
                  res.status(400).json({error});
                });                
              })
              .catch(error => {
                console.error(error);
                res.status(400).json(error);
              });
            })
            .catch(error => res.status(400).json(error));
          }
        })
        .catch(error => {
          console.log(error);
          res.status(400).json({error});
        });

    }
  })
  .catch(error => res.status(500).json({error}));
};


// Récupérer tous les locataires
const getAllTenantsBuilding = (req, res) => {
  Building.findOne({
    id: req.params.building_id,
  }).then(building => {
    if(building.user_id != req.auth.user_id){
      res.status(401).json({message: "vous n'etes pas authorisee a acceder a cette page"});
    } else {
      Tenant.findAll({
        where: {
          active: true,
        },
        include: {
          model: Room,
          through: {
            attributes: ['begin_date', 'end_date', 'active', 'deposit', 'amount', 'contract_link', 'nb_months'], // Pour masquer les champs de la table de jointure
          },
          where: {building_id: req.params.building_id},
        },
        order: [['created_at', 'DESC']],
        }).then((tenants) => {
          if (!tenants) {
            return res.status(404).json({ message: "Tenant not found" });
          }
          res.status(200).json(tenants);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error})
        });
    }
  })
  
};

const adminAllTenant = (req, res) => {
  Tenant.findAll()
    .then((tenants) => res.status(200).json(tenants))
    .catch((error) => res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error}));
};

// Récupérer un locataire par son ID
const getTenant = (req, res) => {
  Tenant.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Room,
      through: {
        attributes: ['begin_date', 'end_date', 'active', 'deposit', 'amount', 'contract_link', 'nb_months'], // Pour masquer les champs de la table de jointure
      },
      where: {building_id: req.params.building_id},
    },
  }).then((tenant) => {
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    } else {
      tenant.getRooms({ getAttribute: Building }).then(rooms => {
        rooms[0].getBuilding().then(building => {
          if(building.user_id != req.auth.user_id && building.id == req.params.building_id){
            return  res.status(401).json({message: "vous n'etes pas authorisee a acceder a cette  page"});
          } else {
            res.status(200).json({tenant});
          }
        }).catch(error => {
          console.log(error);
          res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error})
        })
        
      }
      ).catch((error) => {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error})
      });
    }
  }
  ).catch((error) => {
    console.error(error);
    res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error})
  });
};

// Mettre à jour un locataire par son ID
const setTenant = async (req, res) => {
  Tenant.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Room,
      where: {building_id: req.params.building_id},
    },
    include: Account,
  }).then(tenant => {
    if(!tenant){
      return res.status(404).json({message: "Tenant not found!"})
    }
    Building.findOne({
      where: {
        id: req.params.building_id,
      }
    }).then(building => {
      if(!building){
        return res.status(404).json({message: "Building not found!"})
      }
      if(building.user_id != req.auth.user_id){
        return res.status(401).json({message: "Vous n'etes pas autoriser a acceder a cette page !"});
      }
      
      tenant.update({
        payment_day: req.body.payment_day,
      }).then(tenant => {
        tenant.Account.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone: req.body.phone,
          cni: req.body.cni,
          deliver_on: req.body.deliver_on,
        }).then(() => {
          res.status(200).json(tenant);
        }).catch(error => {
          console.error(error);
          res.status(500).json({error});
        })
      }).catch(error => {
        console.error(error);
        res.status(500).json({error});
      }) 
      
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error});
    });
  })
  .catch(error => { 
    console.error(error);
    res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error})
  })
};
    
// Supprimer un locataire par son ID
const deleteTenant = async (req, res) => {
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
const addCellTenantInvoice = (req, res) => {
  
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

const addContract = (req, res) => {
  Building.findOne({
    where: {id: req.params.building_id},
  }).then(building => {
    if(!building){
      return res.status(404).json({ message: "Building Not Found!"});
    }
    if(building.user_id != req.auth.user_id){
      return res.status(401).json({message: "Vous n'etes pas autoriser a acceder a cette page !"});
    }
    Tenant.findOne({
      where: {
        id: req.params.tenant_id,
      },
    }).then(tenant => {
      Contract.create({
        room_id: req.body.room_id,
        tenant_id: tenant.id,
        amount: req.body.amount,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        deposit: req.body.deposit,
        amount: req.body.amount,
        contract_link: '#',
        nb_months: req.body.nb_months,
      }).then(contract => res.status(201).json(contract))
      .catch(error => {
        console.error(error);
        res.status(500).json({message: "Erreur serveur lors de l'enregistrement des données", error});
      })

    }).catch(error => {
      console.error(error);
      res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error});
    })

  }).catch(error => {
    console.error(error);
    res.status(500).json({message: "Erreur serveur lors de la recuperation des données", error});
  });
}
    
    
module.exports = { addTenant, getAllTenantsBuilding, getTenant, setTenant, deleteTenant, addCellTenantInvoice, adminAllTenant, };
