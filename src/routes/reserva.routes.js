const express = require("express");
const router = express.Router();
const { listarReservasPorQuarto, cadastrarReserva, excluirReserva } = require("../controllers/reserva.controller");

router.get("/listar/reservas/quarto/:quartoId", listarReservasPorQuarto);
router.post("/cadastrar/reserva", cadastrarReserva);
router.delete("/excluir/reserva/:id", excluirReserva);

module.exports = router;