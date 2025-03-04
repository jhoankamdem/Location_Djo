const express = require("express");
const router = express.Router();
const {
  home,
} = require("../controller/page");

// Route pour récupérer la page d'acceuil
router.get("/", home);

module.exports = router;
