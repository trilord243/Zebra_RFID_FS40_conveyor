import https from "https";
import fetch from "node-fetch";
import { fetchToken } from "./fetchToken";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function stopScanner() {
  const { message } = await fetchToken();
  try {
    const response = await fetch("https://192.168.1.197/cloud/stop", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${message}`,
      },

      agent,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    console.log("start");
  } catch (error) {
    console.error("error " + error);
  }
}
