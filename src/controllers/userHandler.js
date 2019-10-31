const User = require("../models/User").default;

module.exports = app => {
  const { emptyOrNull } = app.controllers.errorHandler;

  const save = async (req, res) => {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) throw "Usuário já existe";

      const user = await User.create(req.body);
      emptyOrNull(user, "nenhum usuário");

      user.password = undefined;
      return res.send({ user });
    } catch (err) {
      res.status(400).send({ erro: `${err}` });
    }
  };

  const getUser = async (req, res) => {
    const { email } = req.body;
    const id = req.params.id;
    try {
      if (!id && !email) throw "sem dados para pesquisar";

      if (id) {
        let user = await User.findById(id);
        return res.send({ user });
      }

      if (email) {
        let user = await User.findOne({ email });
        return res.send({ user });
      }
    } catch (err) {}
  };

  return { save, getUser };
};
