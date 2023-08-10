const chatController = require("../controllers/chatController");
const fetchUser = require("../middlewares/fetchUser");
const express = require("express");
const router = express.Router();

router.post("/createChat", fetchUser, chatController.createChat);
router.get("/getChats", fetchUser, chatController.getChats);
router.post("/addChat" , chatController.addChat)

module.exports = router;
