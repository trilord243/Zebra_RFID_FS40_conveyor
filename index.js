// index.js
import express from "express";
import {
  connectModbusClient,
  disconnectModbusClient,
  turnOffChannel,
  turnOnChannel,
} from "./modbus.js";

const app = express();
const port = 3000;

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

connectModbusClient().then(() => {
  app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
  });
});

process.on("SIGINT", () => {
  disconnectModbusClient();
  process.exit();
});
