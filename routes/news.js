// modules:

const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares/checkAuth");
const controller = require("../controllers/news");

// news get requests:

router.get("/all", controller.all);

router.get("/preview", controller.preview);

router.get('/v/:id/modify',  middlewares.auth, middlewares.admin, controller.modify)

// news post requests

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

//export news router:

module.exports = router;
