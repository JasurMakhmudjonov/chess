const authRoute = require("./auth.route");
const tournamentsRoute = require("./tournament.route");
const matchesRoute = require("./match.route");
const usersRoute = require("./user.route");

module.exports = [authRoute, tournamentsRoute, matchesRoute, usersRoute];
