const express           = require("express");
const imageController   = require("../controller/image");
const imageUploder      = require("../helpers/image-uploader");
const authMiddleware    = require("../middleware/auth");
const router            = express.Router();

router.post(
    "/upload",
    authMiddleware.auth,
    imageUploder.upload.single("image"),
    imageController.upload
);

module.exports = router;
