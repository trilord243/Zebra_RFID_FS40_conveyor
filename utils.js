import { turnOffChannel, turnOnChannel } from "./modbus.js";

export async function accionador() {
  await turnOnChannel(4);

  setTimeout(async () => {
    await turnOffChannel(4);
  }, 1000);

  setTimeout(async () => {
    await turnOnChannel(3);
  }, 800);

  setTimeout(async () => {
    await turnOffChannel(3);
  }, 2800);
}
