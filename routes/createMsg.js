const msgController = require("../controllers/msgController");
const fetchUser = require("../middlewares/fetchUser");
const express = require("express");
const router = express.Router();

router.post("/createMsg/:chatId", msgController.createMsg);
router.get("/getMsgs/:chatId", msgController.getMsgs);

module.exports = router;
