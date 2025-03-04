const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

buildingController = require("../controller/building");

// Route pour récupérer la page d'acceuil
router.post("/:user_id/new", auth, buildingController.addBuilding);
router.put("/:user_id/building/:id", auth, buildingController.updateBuilding);
router.delete("/:user_id/building/:id", auth, buildingController.deleteBuilding);
router.get("/:user_id/building/:id", auth, buildingController.getBuilding);
router.get("/:user_id/buildings", auth, buildingController.allBuildings);
router.get("/admin/:user_id/buildings", auth, buildingController.adminBuilding);


module.exports = router;