const msgController = require("../controllers/msgController");
const router = express.Router();

router.post("/createMsg", msgController.createMsg);
router.get("/getMsgs", msgController.getMsgs);

module.exports = router;
