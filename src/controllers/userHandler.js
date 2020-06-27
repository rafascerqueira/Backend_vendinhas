import User from "../database/mongodb/models/User";
import { emptyOrNull } from "../config/validation";

export const save = async (req, res) => {
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

export const getUser = async (req, res) => {
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
  } catch (err) {
    res.status(400).send({ erro: `${err}` });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const doc = req.body;

  try {
    emptyOrNull(id, "id inválido");
    emptyOrNull(doc, "sem dados para alteração");

    await User.findByIdAndUpdate(id, doc, { new: true })
      .then((docs) => {
        if (docs) {
          res.send({ docs });
        } else {
          throw "Alteração não pode ser feita";
        }
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.status(400).send({ erro: `${err}` });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    emptyOrNull(id, "Usuário não encontrado");
    if (!(await User.findById(id))) throw "Usuário não encontrado";
    await User.findByIdAndRemove(id);
    return res.send("Usuário removido com sucesso");
  } catch (err) {
    res.status(400).send({ erro: `${err}` });
  }
};
