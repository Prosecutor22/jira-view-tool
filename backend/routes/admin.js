var express = require("express");
var router = express.Router();
var { authorize } = require("../auth/auth");
var dbconnect = require("../db").connection;
var query = require("../query");

const ensureLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

router.use(ensureLoggedIn);
router.use(authorize("admin"));

// TO-DO: query from MySQL and render dashboard page

// --------------------------------------------------------------

router.get("/tasks", async (req, res) => {
  return null;
});

router.get("/accounts", async (req, res) => {
  return null;
});

router.get("/projects", async (req, res) => {
  return null;
});


module.exports = router;
