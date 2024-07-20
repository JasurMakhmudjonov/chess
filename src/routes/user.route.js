const { Router } = require("express");
const { isAdmin } = require("../middlewares/is-admin.middleware");
const {
  getUsers,
  getLeaderboard,
  create,
  update,
  remove,
} = require("../controllers/user.controller");
const router = Router();

const route = "/users";

router.get(`${route}`, isAdmin, getUsers);
router.get(`${route}/leaderboard`, getLeaderboard);
router.post(`${route}`, isAdmin, create);
router.put(`${route}/:id`, isAdmin, update);
router.delete(`${route}/:id`, isAdmin, remove);

module.exports = router;
