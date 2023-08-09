const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/createChat", chatController.createChat);
router.get("/getChats", chatController.getChats);

module.exports = router;
