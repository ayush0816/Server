const msgController = require("../controllers/msgController");
const fetchUser = require("../middlewares/fetchUser");
const router = express.Router();

router.post("/createMsg", fetchUser, msgController.createMsg);
router.get("/getMsgs", fetchUser, msgController.getMsgs);

module.exports = router;
