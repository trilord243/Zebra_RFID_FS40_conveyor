// modbusFunctions.js
import ModbusRTU from "modbus-serial";

const client = new ModbusRTU();
const ip = "192.168.1.30";
const port = 502;
const startAddressForOutputChannel = 16;

const heartbeatInterval = 10000;
// eslint-disable-next-line no-unused-vars
let heartbeatTimer;

export const connectModbusClient = async () => {
  try {
    await client.connectTCP(ip, { port: port });
    console.log("Conectado a %s en el puerto %s", ip, port);

    heartbeatTimer = setInterval(() => {
      client
        .readCoils(startAddressForOutputChannel, 1)
        .then(() => {})
        .catch((e) => {
          console.error("Error en el heartbeat:", e);
        });
    }, heartbeatInterval);
  } catch (e) {
    console.error(e);
  }
};

export const turnOnChannel = async (channelNumber) => {
  try {
    await client.writeCoil(
      startAddressForOutputChannel + channelNumber - 1,
      true
    );
    console.log(`Canal ${channelNumber} encendido`);
  } catch (e) {
    console.error(e);
  }
};

export const turnOffChannel = async (channelNumber) => {
  try {
    await client.writeCoil(
      startAddressForOutputChannel + channelNumber - 1,
      false
    );
    console.log(`Canal ${channelNumber} apagado`);
  } catch (e) {
    console.error(e);
  }
};

export const disconnectModbusClient = () => {
  client.close();
  console.log("Conexión Modbus cerrada");
};

await connectModbusClient();
await turnOffChannel(1);
