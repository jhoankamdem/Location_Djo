const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI || "mongodb+srv://jhoankamdem:iWGHvVFAOmRdb0sl@cluster0.57vv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || url);
    console.log("Mongo connecté");
  } catch (err) {
    console.error(`Erreur de connexion à MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
