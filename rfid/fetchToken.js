import https from "https";
import fetch from "node-fetch";
import base64 from "base-64";

const login = "admin";
const password = "Link420/";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function fetchToken() {
  try {
    const response = await fetch("https://192.168.1.197/cloud/localRestLogin", {
      headers: new Headers({
        Authorization: `Basic ${base64.encode(`${login}:${password}`)}`,
      }),
      agent,
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {}
}
