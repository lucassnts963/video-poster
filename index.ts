import { robots } from "./src/robots";

async function start() {
  // robots.input();
  await robots.YouTubeDownloader();
}

start();
