import net from "net";
import { turnOffChannel } from "./modbus.js";
import { accionador } from "./utils.js";
import { io } from "./index.js";
const tcpPort = 3012;
let shouldListenForHello = false;
let shouldListenForPairing = false;
let rfid = "";
let emparejamientos = [];
let code = "";

export const startListeningForHello = (codigoGanador) => {
  shouldListenForHello = true;
  code = codigoGanador; // Actualiza la variable 'code' con el código ganador
};

export const startPairingProcess = (rfidCode) => {
  rfid = rfidCode;
  shouldListenForPairing = true;
};
export const updateRFID = (newRFID) => {
  rfid = newRFID;
};

const tcpServer = net.createServer((socket) => {
  console.log("Conectado 🎗");

  socket.on("data", async (data) => {
    const message = data.toString().trim();
    console.log("Datos:", message);

    if (shouldListenForHello && message === code) {
      setTimeout(async () => {
        await turnOffChannel(1);
        accionador();
      }, 1000);
      shouldListenForHello = false;
    }

    if (shouldListenForPairing) {
      const nuevoEmparejamiento = { idHex: rfid, codigoProducto: message };
      emparejamientos.push(nuevoEmparejamiento);
      io.emit("nuevoEmparejamiento", nuevoEmparejamiento);
    }
  });

  socket.write("Hola, cliente. Te has conectado exitosamente al servidor.");

  socket.on("end", () => {
    console.log("Cliente desconectado.");
  });

  socket.on("error", (error) => {
    console.error("Se ha producido un error:", error);
  });
});

tcpServer.listen(tcpPort, () => {
  console.log(`Servidor TCP escuchando en el puerto ${tcpPort}`);
});

tcpServer.on("error", (error) => {
  console.error("Error del servidor TCP:", error);
});

export const getPairings = () => {
  return emparejamientos;
};

export const clearPairings = () => {
  emparejamientos = [];
};
