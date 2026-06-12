const prisma = require("../data/prisma");

const listarQuartos = async (req, res) => {
  try {
    const quartos = await prisma.quarto.findMany({ orderBy: { numero: "asc" } });
    res.json(quartos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const cadastrarQuarto = async (req, res) => {
  try {
    const { numero, tipo } = req.body;
    if (!numero || !tipo) return res.status(400).json({ erro: "Número e tipo obrigatórios" });
    const quarto = await prisma.quarto.create({ data: { numero, tipo } });
    res.status(201).json(quarto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const excluirQuarto = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quarto.delete({ where: { id: Number(id) } });
    res.json({ mensagem: "Quarto excluído" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { 
    listarQuartos, 
    cadastrarQuarto, 
    excluirQuarto 
};