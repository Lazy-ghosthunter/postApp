const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { Op } = require("sequelize");

router.get("/cadastrar", function (req, res) {
  res.render("cadastro");
});

router.get("/entrar", function (req, res) {
  res.render("login");
});

router.post("/cad", async function (req, res) {
  try {
    const usuarioCriado = await User.create({
      nome: req.body.nome,
      usuario: req.body.usuario,
      email: req.body.email,
      senha: req.body.senha,
    });
    req.session.user = usuarioCriado;
    res.redirect("/postagens");
  } catch (erro) {
    res.send("Erro ao cadastrar: " + erro);
  }
});

router.post("/login", async function (req, res) {
  try {
    const usuarioEncontrado = await User.findOne({
      where: {
        [Op.and]: [
          { email: req.body.email },
          { senha: req.body.senha }
        ]
      }
    });
    if (usuarioEncontrado) {
      req.session.user = usuarioEncontrado;
      res.redirect('/postagens');
    } else {
      res.send('Senha ou email incorreto');
    }
  } catch (erro) {
    res.send('Erro ao logar: ' + erro);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/usuario/login");
  });
});

module.exports = router;
