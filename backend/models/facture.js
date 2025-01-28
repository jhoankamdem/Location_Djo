const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const factureSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    nouveauIndex: { type: Number, required: false},
    ancienIndex: { type: Number, required: true},
    statut: { type: Boolean, required: false}
  },

);



const Facture = mongoose.model("Facture", factureSchema);

module.exports = Facture;
