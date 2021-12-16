// modules:

const express = require("express");
const router = express.Router();
const controller = require("../controllers/books");

// books get requests:

router.get("/all", controller.all);

router.get("/:book", controller.preview);

router.get("/:id/:chapter", controller.chapter);

router.get("/v/:id/modify", controller.modify);

// books post requests

router.post("/v/add/:id", controller.create);

router.post("/v/update/:id", controller.update);

router.delete("/v/delete/:id", controller.delete);

//export books router:

module.exports = router;
