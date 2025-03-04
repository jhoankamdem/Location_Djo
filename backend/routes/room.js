const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const roomController = require('../controller/room');

router.post("/building/:building_id/room/new", auth, roomController.addRoom);
router.put("/building/:building_id/room/:id", auth, roomController.updateRoom);
router.delete("/building/:building_id/room/:id", auth, roomController.deleteRoom);
router.get("/building/:building_id/room/:id", auth, roomController.getRoom);
router.get("/building/:building_id/rooms", auth, roomController.getRooms);
// router.get("/building/:building_id/rooms/available", auth, roomController.getAvailableRooms);
// router.get("/building/:building_id/rooms/unavailable", auth, roomController.getUnavailableRooms);
router.get("/building/:building_id/room/:id/tenants", auth, roomController.getOtenantsRooms);

module.exports = router;