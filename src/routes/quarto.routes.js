const express = require("express");
const router = express.Router();
const { listarQuartos, cadastrarQuarto, excluirQuarto } = require("../controllers/quarto.controller");

router.get("/listar/quartos", listarQuartos);
router.post("/cadastrar/quartos", cadastrarQuarto);
router.delete("/excluir/quarto/:id", excluirQuarto);

module.exports = router;