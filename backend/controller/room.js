
const Room =  require('../models/Room');
const Building = require('../models/Building');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
// const db = require('../models/index');

const addRoom = (req, res) => {
    Building.findOne({
        where: {
            id: req.params.building_id,
        },
    }).then((building) => {
        if(!building){
            console.error("batiment non existant");
            res.status(404).json({message: "ce batiment n'existe pas"});
        } else {
            if(building.user_id != req.auth.user_id){
                res.status(401).json({message: "vous n'etes pas authorisee a acceder a cette page"});
            } else {
                building.createRoom({
                    room_number: req.body.room_number,
                    amount: req.body.amount,
                    type_of_rooms: req.body.type_of_rooms,
                    available: req.body.available,
                    active: true,
                    comment: req.body.comment,
                })
                .then((room) => res.status(201).json(room))
                .catch(error => {
                    console.error(error);
                    res.status(400).json({error});
                });
            }
        }
    })
    .catch(error => res.status(401).json({error}));
    
}

const getRoom = (req, res) => {
    Room.findOne({
        where: {
            id: req.params.id
        }, 
    }).then(room => {
        if(!room){
            console.error("batiment non existant");
            res.status(404).json({message: "ce batiment n'existe pas"});
        } else {
            room.getBuilding().then(building => {
                if(building.user_id != req.auth.user_id){
                    res.status(401).json({message: "vous n'etes pas authorisee a acceder a cette page"});
                } else {
                    res.status(200).json(room);
                }
            }).catch(error => res.status(500).json({error}));
            
        }
    })
    .catch(error => res.status(500).json({error}));
    
}

const getRooms = (req, res) => {

    Building.findOne({
        where: {
            id: req.params.building_id
        }, 
    }).then(building => {
        if(!building){
            console.error("batiment non existant");
            res.status(404).json({message: "ce batiment n'existe pas"});
        } else {
            if(building.user_id != req.auth.user_id){
                res.status(401).json({message: "vous n'etes pas authorisee a acceder a cette page"});
            } else {
                building.getRooms()
                .then((rooms) => res.status(200).json(rooms))
                .catch(error => res.status(404).json({error}));
            }
        }
    })
    .catch(error => res.status(500).json({error}));

}

const updateRoom = (req, res) => {
    
    Room.findOne({
        where: {
            id: req.params.id,
        }
    }).then((room) => {
        if(!room){
            res.status(404).json({message: "celle piece n'existe pas"});
        } else {
            room.getBuilding().then((building) => {
                console.log(building);
                console.log(building.user_id);
                if(building.user_id != req.auth.user_id){
                    res.status(401).json({message: "vous n'etes pas autorisee a acceder a cette page !"});
                } else {
                    room.room_number = req.body.room_number;
                    room.amount = req.body.amount;
                    room.type_of_rooms = req.body.type_of_rooms;
                    room.available = req.body.available;

                    room.save()
                        .then(room => res.status(200).json(room))
                        .catch(error => res.status(400).json({error}));
                }
            })
            .catch(error => res.status(400).json({error}));
        }
    })
    .catch(error => res.status(400).json({error}));
}

const deleteRoom = (req, res) => {
    Room.findOne({
        where: {
            id: req.params.id,
        }
    }).then((room) => {
        if(!room){
            res.status(404).json({message: "celle piece n'existe pas"});
        } else {
            room.getBuilding().then((building) => {
                if(building.user_id != req.auth.user_id){
                    res.status(401).json({message: "vous n'etes pas autorisee à acceder a cette page !"});
                } else {
                    room.destroy()
                        .then(() => res.status(200).json({message: "la piece a ete supprimer avec success"}))
                        .catch(error => res.status(400).json({error}));
                }
            })
            .catch(error => res.status(400).json({error}));
        }
    })
    .catch(error => res.status(401).json({error}));
}

const getOtenantsRooms = (req, res) => {
    // console.log(db);
    Room.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Tenant,
            through: {
                attributes: [],
            },
            
        },
    }).then(rooms => {
        res.status(200).json(rooms);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({error});
    });
}

module.exports = { addRoom, getRoom, getRooms, updateRoom, deleteRoom, getOtenantsRooms,}