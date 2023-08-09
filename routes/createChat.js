const chatController = require("../controllers/chatController");
const fetchUser = require("../middlewares/fetchUser");
const router = express.Router();

router.post("/createChat", fetchUser, chatController.createChat);
router.get("/getChats", fetchUser, chatController.getChats);

module.exports = router;
