const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const tenantController = require("../controller/tenant");

// Route pour créer un client
router.post("/building/:building_id/tenant/new", auth, tenantController.addTenant);

// Route pour récupérer tous les clients
router.get("/building/:building_id/tenants", auth, tenantController.getAllTenantsBuilding);

// Route pour récupérer un client par son ID
router.get("/building/:building_id/tenant/:id", auth, tenantController.getTenant);

// Route pour mettre à jour un client par son ID
router.put("/building/:building_id/tenant/:id", auth, tenantController.setTenant);

// Route pour supprimer un client par son ID
router.delete("/building/:building_id/tenant/:id", auth, tenantController.deleteTenant);

// Nouvelle route pour ajouter une cellule de facture
// router.post("/:id", addCellTenantInvoice);
/* //route pour filtre
router.delete("/2", getTousLocataires2); */




module.exports = router;
