const { Router } = require("express");
const { isAdmin } = require("../middlewares/is-admin.middleware");
const {
  updateMatch,
  showMatches,
  showPersonal,
} = require("../controllers/match.controller");
const { isAuth } = require("../middlewares/is-auth.middleware");
const router = Router();

const route = "/matches";

router.put(`${route}/:id`, isAdmin, updateMatch);
router.get(`${route}/`, isAdmin, showMatches);
router.get(`${route}/own`, isAuth, showPersonal);

module.exports = router;
