// Importa el módulo net para trabajar con TCP
import net from "net";

// Define el puerto en el que el servidor estará escuchando
const port = 3012;

// Crea un servidor TCP utilizando el módulo net
const server = net.createServer((socket) => {
  console.log("Conecto 🎗");

  // Evento que maneja los datos recibidos del cliente
  socket.on("data", (data) => {
    console.log("Datos:", data.toString());
  });

  // Envía un mensaje al cliente
  socket.write("Hola, cliente. Te has conectado exitosamente al servidor.");

  // Evento que maneja el cierre de la conexión
  socket.on("end", () => {
    console.log("Cliente desconectado.");
  });

  // Maneja errores potenciales
  socket.on("error", (error) => {
    console.error("Se ha producido un error:", error);
  });
});

// El servidor comienza a escuchar peticiones
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Manejo de errores a nivel del servidor
server.on("error", (error) => {
  console.error("Error del servidor:", error);
});
