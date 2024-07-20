const { checkToken } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  if (req.headers.token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  checkToken(req.headers.token, async (err, data) => {
    if (err) {
      console.log(err);
      res.status(403).json({ nessage: "Unauthorized" });
    }
    req.user = data;
    next();
  });
};

module.exports = {isAuth};

