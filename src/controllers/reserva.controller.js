const prisma = require("../data/prisma");

const listarReservasPorQuarto = async (req, res) => {
  try {
    const { quartoId } = req.params;
    const reservas = await prisma.reserva.findMany({
      where: { quarto_id: Number(quartoId) },
      orderBy: { data_entrada: "asc" },
    });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const cadastrarReserva = async (req, res) => {
  try {
    const { hospede, data_entrada, data_saida, quarto_id } = req.body;
    if (!hospede || !data_entrada || !data_saida || !quarto_id)
      return res.status(400).json({ erro: "Todos os campos obrigatórios" });

    const reserva = await prisma.reserva.create({
      data: {
        hospede,
        data_entrada: new Date(data_entrada),
        data_saida: new Date(data_saida),
        quarto_id: Number(quarto_id),
      },
    });
    res.status(201).json(reserva);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const excluirReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.reserva.delete({ where: { id: Number(id) } });
    res.json({ mensagem: "Reserva excluída" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { 
    listarReservasPorQuarto, 
    cadastrarReserva, 
    excluirReserva 
};