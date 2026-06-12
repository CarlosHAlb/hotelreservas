require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const quartoRoutes = require("./src/routes/quarto.routes");
const reservaRoutes = require("./src/routes/reserva.routes");

app.use("/quartos", quartoRoutes);
app.use("/reservas", reservaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));