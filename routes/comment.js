const express = require("express");
const commentController = require("../controller/comment");
const authMiddleware = require('../middleware/auth')
const router = express.Router();

router.get("/", commentController.index);
router.post("/", authMiddleware.auth, commentController.save);
router.get("/:id", commentController.show);
router.patch("/:id", commentController.update);
router.delete("/:id", commentController.destroy);

module.exports = router;
