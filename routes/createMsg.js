const msgController = require("../controllers/msgController");
const fetchUser = require("../middlewares/fetchUser");
const router = express.Router();

router.post("/createMsg/:chatId", fetchUser, msgController.createMsg);
router.get("/getMsgs/:chatId", fetchUser, msgController.getMsgs);

module.exports = router;
