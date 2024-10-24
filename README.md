# Elgato Light

This is a small Deno script that allows incrementing/decrementing of the Elgato Key Light.

In my setup I have one light. I have bound this script to the brightness modifiers on my Keychron keyboard.

## Usage:

Set up url env vars `ELGATO_LIGHT_BASE_URLS` (Comma separated).

```shell
  deno run -A index.ts increment # increments brightness by 5
  deno run -A index.ts decrement # increments brightness by 5
```
