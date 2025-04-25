const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");

router.post("/", contactUsController.createMessage);
router.get("/", contactUsController.getAllMessages);
router.get("/:id", contactUsController.getMessage);
router.put("/:id", contactUsController.updateMessage);
router.delete("/:id", contactUsController.deleteMessage);

module.exports = router;
