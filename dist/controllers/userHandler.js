"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.getUser = exports.save = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _validation = require("../config/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const save = async (req, res) => {
  const {
    email
  } = req.body;

  try {
    if (await _User.default.findOne({
      email
    })) throw "Usuário já existe";
    const user = await _User.default.create(req.body);
    (0, _validation.emptyOrNull)(user, "nenhum usuário");
    user.password = undefined;
    return res.send({
      user
    });
  } catch (err) {
    res.status(400).send({
      erro: `${err}`
    });
  }
};

exports.save = save;

const getUser = async (req, res) => {
  const {
    email
  } = req.body;
  const id = req.params.id;

  try {
    if (!id && !email) throw "sem dados para pesquisar";

    if (id) {
      let user = await _User.default.findById(id);
      return res.send({
        user
      });
    }

    if (email) {
      let user = await _User.default.findOne({
        email
      });
      return res.send({
        user
      });
    }
  } catch (err) {
    res.status(400).send({
      erro: `${err}`
    });
  }
};

exports.getUser = getUser;

const updateUser = async (req, res) => {
  const id = req.params.id;
  const doc = req.body;

  try {
    (0, _validation.emptyOrNull)(id, "id inválido");
    (0, _validation.emptyOrNull)(doc, "sem dados para alteração");
    await _User.default.findByIdAndUpdate(id, doc, {
      new: true
    }).then(docs => {
      if (docs) {
        res.send({
          docs
        });
      } else {
        throw "Alteração não pode ser feita";
      }
    }).catch(err => {
      throw err;
    });
  } catch (err) {
    res.status(400).send({
      erro: `${err}`
    });
  }
};

exports.updateUser = updateUser;

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    (0, _validation.emptyOrNull)(id, "Usuário não encontrado");
    if (!(await _User.default.findById(id))) throw "Usuário não encontrado";
    await _User.default.findByIdAndRemove(id);
    return res.send("Usuário removido com sucesso");
  } catch (err) {
    res.status(400).send({
      erro: `${err}`
    });
  }
};

exports.deleteUser = deleteUser;
//# sourceMappingURL=userHandler.js.map