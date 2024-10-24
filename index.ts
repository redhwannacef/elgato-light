const action = Deno.args[0] as Action;
const path = "/elgato/lights";
const urls = Deno.env.get("ELGATO_LIGHT_BASE_URLS");

if (!urls) {
  console.error(`env var 'ELGATO_LIGHT_BASE_URLS' is required`);
  Deno.exit(1);
}

await Promise.all(urls.split(",").map((url) => updateLight(url + path)));

async function updateLight(url: string) {
  const status: LightsStatus = await fetch(url).then((response) =>
    response.json(),
  );

  const currentBrightness = status.lights[0].brightness;
  const brightness =
    action === "increment"
      ? Math.min(100, currentBrightness + 5)
      : Math.max(0, currentBrightness - 5);

  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ lights: [{ brightness }] }),
  });
}

type Action = "increment" | "decrement";

type LightStatus = {
  on: number;
  brightness: number;
  temperature: number;
};

type LightsStatus = {
  numberOfLights: number;
  lights: LightStatus[];
};
