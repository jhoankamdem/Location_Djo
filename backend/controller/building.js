const Building = require("../models/Building");

const User = require('../models/User');

const addBuilding = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id,
        }
    }).then((user) => {
        if(!user){
            console.error("utilisateur non existant");
            res.status(404).json({error: "cette page n'existe pas!"})
        } else {
            if(user.id != req.auth.user_id){
                res.status(401).json({message: "Vous n'etes pas autoriser a acceder a cette page"});
            } else {
                user.createBuilding({
                    address_1: req.body.address_1,
                    address_2: req.body.address_2,
                    description: req.body.description,
                    water_price: Number(req.body.water_price),
                    light_price: Number(req.body.light_price),
                    nb_house: Number(req.body.nb_house),
                    // facultatif
                    nb_rooms: Number(req.body.nb_rooms),
                    nb_studio: Number(req.body.nb_studio),
                    nb_appartment: Number(req.body.nb_appartment),
                }).then(building => res.status(201).json(building))
                    .catch(error => {
                        console.error(error);
                        res.status(400).json({error})
                    });
            }
        }
                    
    }).catch(error => {
        res.status(500).json({error});
    });
}


const getBuilding = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id,
        },
    }).then(user => {
        if(!user){
            console.error("utilisateur non existant");
            res.status(404).json({error: "cette page n'existe pas!"})
        } else {
            user.getBuildings({
                where: {
                    id: req.params.id
                },
                limit: 1,
            }).then(buildings => {
                if(buildings.length < 1){
                    console.error("ce batiment n'existe pas");
                    res.status(404).json({error: "cette page n'existe pas!"});
                } else {
                    res.status(200).json(buildings[0])}
                })
            .catch(error => res.status(404).json({error}));
        }
    }).catch(error => res.status(500).json(error));
    
}

const allBuildings = (req, res) => {
    console.log(req.params);
    console.log(req.auth);

    User.findOne({
        where: {
            id: req.params.user_id,
        },
    }).then((user) => {
        user.getBuildings()
            .then(buildings => res.status(200).json(buildings))
            .catch(error => res.status(400).json({error}));

    }).catch(error => {
        console.log(req.auth);
        res.status(400).json({error})}
    );
}

const adminBuilding = (req, res) => {
    Building.findAll()
        .then(buildings => res.status(200).json(buildings))
        .catch(error => res.status(500).json({error}));
}

const updateBuilding = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id,
        },
    }).then(user => {
        if(!user){
            console.error("utilisateur non existant");
            res.status(404).json({error: "cette page n'existe pas!"})
        } else {
            user.getBuildings({
                where: {
                    id: req.params.id
                },
                limit: 1,
            }).then((buildings) => {
                if(buildings.length < 1){
                    console.error("ce batiment n'existe pas");
                    res.status(404).json({error: "cette page n'existe pas!"});
                } else {
                    if(user.id != req.auth.user_id){
                        res.status(401).json({message: "vous n'etes pas autoriser a acceder a cette page"})
                    } else {
                        buildings[0].update({
                            address_1: req.body.address_1,
                            address_2: req.body.address_2,
                            description: req.body.description,
                            water_price: req.body.water_price,
                            light_price: req.body.light_price,
                            nb_house: req.body.nb_house,
                        }).then(building => res.status(200).json(building))
                        .catch(error => res.status(401).json({error}));
                    }
                }
            })
            .catch(error => res.status(404).json({error}));
        }
    }).catch(error => res.status(400).json(error));
    
}

const deleteBuilding = (req, res) => {
    
    User.findOne({
        where: {
            id: req.params.user_id,
        }
    }).then(user => {
        if(!user){
            console.error("utilisateur non existant");
            res.status(404).json({error: "cette page n'existe pas!"})
        } else {
            user.getBuildings({
                where: {
                    id: req.params.id
                },
                limit: 1,
            }).then((buildings) => {
                console.log(buildings);
                if(buildings.length < 1){
                    console.error("ce batiment n'existe pas");
                    res.status(404).json({error: "cette page n'existe pas!"});
                } else {
                    if(user.id != req.auth.user_id){
                        res.status(401).json({message: "vous n'etes pas autoriser a acceder a cette page"})
                    } else {
                        buildings[0].destroy()
                            .then(() => res.status(200).json({message :"Object supprimer!"}))
                            .catch(error => res.status(401).json({error}));
                    }
                }
                
            })
            .catch(error => res.status(404).json({error}));
        }
        
    }).catch(error => res.status(500).json({error}));
    
}

module.exports = { addBuilding, getBuilding, allBuildings, adminBuilding, updateBuilding, deleteBuilding, }