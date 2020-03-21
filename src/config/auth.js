import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { emptyOrNull, isTokenExpired } from "./validation";

require("dotenv").config();
const secret = process.env.AUTH_SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    emptyOrNull(email, "E-mail não informado");
    emptyOrNull(password, "Senha não informada");

    const user = await User.findOne({ email }).select("+password");

    emptyOrNull(user, "Usuário não encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw "E-mail / Senha inválidos!";

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.fullname,
      admin: user.admin,
      iat: now,
      exp: now + Math.pow(60, 2) * 24 * 1
    };

    res.json({
      ...payload,
      token: jwt.sign(payload, secret)
    });
  } catch (err) {
    res.status(400).send({ erro: `${err}` });
  }
};

export const validateToken = async (req, res) => {
  const user = req.body || null;
  try {
    if (user) {
      const token = jwt.decode(user.token, secret);
      const result = isTokenExpired(token);

      await res.send(result);
    }
  } catch (err) {
    res.status(403).send({ Erro: `${err}` });
  }
};
