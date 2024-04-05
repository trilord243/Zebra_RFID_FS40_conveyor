// Importa el módulo net para trabajar con TCP
import net from "net";

const port = 3012;

const server = net.createServer((socket) => {
  console.log("Conecto 🎗");

  socket.on("data", (data) => {
    console.log("Datos:", data.toString());
  });

  socket.write("Hola, cliente. Te has conectado exitosamente al servidor.");

  socket.on("end", () => {
    console.log("Cliente desconectado.");
  });

  socket.on("error", (error) => {
    console.error("Se ha producido un error:", error);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

server.on("error", (error) => {
  console.error("Error del servidor:", error);
});
