const { prisma } = require("../utils/connection");
const bcrypt = require("bcrypt");
const { loginSchema, registerSchema } = require("../schema/auth.schema");
const { createToken } = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { fullname, email, password, age, country } = req.body;
    const { error } = registerSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const findUser = await prisma.users.findUnique({ where: { email } });
    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        age,
        country,
      },
    });

    const token = createToken({ id: user.id, isAdmin: user.isAdmin });

    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    }
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: " Invalid email or password " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: " Invalid email or password " });
    }
    const token = createToken({ id: user.id, isAdmin: user.isAdmin });

    res.status(200).json({ message: "User logged successfully", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
