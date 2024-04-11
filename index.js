/* eslint-disable no-undef */
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  connectModbusClient,
  disconnectModbusClient,
  turnOffChannel,
  turnOnChannel,
} from "./modbus.js";
import {
  clearPairings,
  getPairings,
  startListeningForHello,
  startPairingProcess,
  updateRFID,
} from "./tcpServer.js";
import { invitados } from "./invitados.js";
import { accionador } from "./utils.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola, mundo!");
});
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

app.post("/rfid", async (req, res) => {
  console.log(req.body);
  const newRFID = req.body[0].data.idHex;
  const antena = req.body[0].data.antenna;

  const invitado = invitados.find((invitado) => invitado.RFID === newRFID);

  if (invitado && antena === 2) {
    const codigoGanador = invitado.cod_ganado;
    await turnOnChannel(1);
    startListeningForHello(codigoGanador);
    io.emit("invitadoEncontrado", invitado);
    res.send(
      "RFID encontrado, canal 1 encendido y esperando mensaje correspondiente"
    );
  } else {
    updateRFID(newRFID);
    res.send("RFID guardado");
  }

  console.log(`RFID actualizado: ${newRFID}`);
});

app.get("/emparejamiento", async (req, res) => {
  await turnOnChannel(1);
  startPairingProcess();
  res.send("Canal 1 encendido y esperando emparejamientos");
});

app.get("/culminar-emparejamiento", async (req, res) => {
  await turnOffChannel(1);
  const emparejamientos = getPairings();
  console.log(emparejamientos);
  res.json(emparejamientos);
  clearPairings();
});

connectModbusClient().then(() => {
  httpServer.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
  });
});

process.on("SIGINT", () => {
  disconnectModbusClient();
  process.exit();
});
