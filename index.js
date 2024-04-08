import express from "express";
import {
  connectModbusClient,
  disconnectModbusClient,
  turnOffChannel,
  turnOnChannel,
} from "./modbus.js";
import {
  startListeningForHello,
  startPairingProcess,
  getPairings,
  clearPairings,
  updateRFID,
} from "./tcpServer.js";
import { accionador } from "./utils.js";
import { invitados } from "./invitados.js";
const app = express();
const port = 3000;
app.use(express.json());
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
  const newRFID = req.body[0].data.idHex;
  const invitado = invitados.find((invitado) => invitado.RFID === newRFID);

  if (invitado) {
    const codigoGanador = invitado.cod_ganado;
    await turnOnChannel(1);
    startListeningForHello(codigoGanador);
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
  app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
  });
});
process.on("SIGINT", () => {
  disconnectModbusClient();
  process.exit();
});
