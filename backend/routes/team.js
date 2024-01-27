var express = require("express");
var router = express.Router();
var dbconnect = require("../db").connection;
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var { authorize } = require("../auth/auth");
var query = require("../query");

var ensureLoggedIn = ensureLogIn("/signin-team");

router.use(ensureLoggedIn);
router.use(authorize("team"));


router.get("/task", async (req, res) => {
    return null;
});

module.exports = router;
