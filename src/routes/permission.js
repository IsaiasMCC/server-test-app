const { Router } = require("express");
const { check, validationResult  } = require("express-validator");
const { permission } = require("../controllers/PermissionController");
const multer = require('multer');
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/",
  [
    //   check("apk_file", "El campo apk_file es obligatorio").not().isEmpty(),
      upload.single("apk_file"),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await permission(req, res);
  }
);

module.exports = router;
