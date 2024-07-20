const { Router } = require("express");
const {
  create,
  update,
  remove,
  show,
  showPersonal,
  assignPlayer,
  startTournament,
  getLeaderboard,
} = require("../controllers/toutnament.controller");
const { isAdmin } = require("../middlewares/is-admin.middleware");
const { isAuth } = require("../middlewares/is-auth.middleware");
const router = Router();

const route = "/tournaments";

router.post(`${route}`, isAdmin, create);
router.put(`${route}/:id`, isAdmin, update);
router.delete(`${route}/:id`, isAdmin, remove);
router.get(`${route}`, show);
router.get(`${route}/own`, isAuth, showPersonal);
router.post(`${route}/assign`, isAdmin, assignPlayer);
router.post(`${route}/start/:tournament_id`, isAdmin, startTournament);
router.get(`${route}/leaderboard/:tournament_id`, getLeaderboard);

module.exports = router;
