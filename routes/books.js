// modules:

<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const controller = require("../controllers/books");
=======
const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/books')
>>>>>>> 9329a8956bc73718b6381602263a5046a3ccd6f2

// books get requests:

router.get("/all", controller.all);

router.get("/:book", controller.preview);

<<<<<<< HEAD
router.get("/:id/:chapter", controller.chapter);

router.get("/v/:id/modify", controller.modify);

// books post requests

router.post("/v/add/:id", controller.create);

router.post("/v/update/:id", controller.update);

router.delete("/v/delete/:id", controller.delete);
=======
router.get('/:id/:chapter', middlewares.auth, controller.chapter)

router.get('/v/:id/modify',  middlewares.auth, middlewares.admin, controller.modify)

// books post requests

router.post('/v/add/:id', middlewares.auth, middlewares.admin, controller.create)

router.post('/v/update/:id', middlewares.auth, middlewares.admin, controller.update)

router.delete('/v/delete/:id', middlewares.auth, middlewares.admin, controller.delete)
>>>>>>> 9329a8956bc73718b6381602263a5046a3ccd6f2

//export books router:

module.exports = router;
