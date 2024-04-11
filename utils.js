import { turnOffChannel, turnOnChannel } from "./modbus.js";

export async function accionador() {
  await turnOnChannel(3);

  setTimeout(async () => {
    await turnOffChannel(3);
  }, 900);

  setTimeout(async () => {
    await turnOnChannel(4);
  }, 800);

  setTimeout(async () => {
    await turnOffChannel(4);
  }, 2800);
}
