// tcpServer.js
import net from "net";
import { turnOffChannel } from "./modbus.js";
import { accionador } from "./utils.js";

const tcpPort = 3050;
let shouldListenForHello = false;

export const startListeningForHello = () => {
  shouldListenForHello = true;
};

const tcpServer = net.createServer((socket) => {
  console.log("Conectado 🎗");

  socket.on("data", async (data) => {
    const message = data.toString().trim();
    console.log("Datos:", message);

    if (shouldListenForHello && message === "P1063406-038") {
      setTimeout(async () => {
        await turnOffChannel(1);
        accionador();
      }, 1000);
      shouldListenForHello = false;
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
