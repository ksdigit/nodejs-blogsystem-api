const express           = require("express");
const router            = express.Router();
const postController    = require("../controller/post");
const authMiddleware    = require("../middleware/auth");

router.get("/", postController.index);
router.post("/", authMiddleware.auth, postController.save);
router.get("/:id", postController.show);
router.patch("/:id", authMiddleware.auth, postController.update);
router.delete("/:id", authMiddleware.auth, postController.destroy);

module.exports = router;
