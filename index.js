// index.js
import express from "express";
import {
  connectModbusClient,
  disconnectModbusClient,
  turnOffChannel,
  turnOnChannel,
} from "./modbus.js";
import { startListeningForHello } from "./tcpServer.js";
import { accionador } from "./utils.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/turn-on/:channel", async (req, res) => {
  const channel = parseInt(req.params.channel);
  await turnOnChannel(channel);
  res.send(`Canal ${channel} encendido`);
});

app.get("/turn-off/:channel", async (req, res) => {
  const channel = parseInt(req.params.channel);
  await turnOffChannel(channel);
  res.send(`Canal ${channel} apagado`);
});

app.get("/iniciar", async (req, res) => {
  await turnOnChannel(1);
  startListeningForHello();
  res.send("Canal 1 encendido y esperando mensaje 'hola'");
});
app.get("/disparador", async (req, res) => {
  accionador();
  res.send("Canal 3 encendido");
});

connectModbusClient().then(() => {
  app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
  });
});

process.on("SIGINT", () => {
  disconnectModbusClient();
  process.exit();
});
