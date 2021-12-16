// modules:

const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/checkAuth");
const controller = require("../controllers/courses");

// courses get requests:

router.get("/all", controller.all);

router.get("/:id", controller.preview);

router.get("/:id/:part", middlewares.auth, controller.part);

router.get('/v/:id/modify',  middlewares.auth, middlewares.admin, controller.modify)

// courses post requests

router.post(
  "/v/add/:id",
  middlewares.auth,
  middlewares.admin,
  controller.create
);

router.post(
  "/v/update/:id",
  middlewares.auth,
  middlewares.admin,
  controller.update
);

router.delete(
  "/v/delete/:id",
  middlewares.auth,
  middlewares.admin,
  controller.delete
);

//export courses router:

module.exports = router;
