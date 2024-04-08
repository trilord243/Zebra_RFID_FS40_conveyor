import https from "https";
import fetch from "node-fetch";
import { fetchToken } from "./fetchToken";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function startScanner() {
  try {
    const { message } = await fetchToken();
    if (!message) {
      console.error("No se pudo obtener el token");
      return;
    }

    const response = await fetch("https://192.168.1.197/cloud/start", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${message}`,
      },
      agent,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    console.log("La acción PUT se realizó con éxito");
  } catch (error) {
    console.error("Error al realizar la acción PUT: ", error);
  }
}
