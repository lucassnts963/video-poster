import fs from "fs";

import { Content } from "./input";

const contentFilePath = "./src/content/content.json";

function save(content: Content) {
  const contentString = JSON.stringify(content);

  return fs.writeFileSync(contentFilePath, contentString);
}

function load() {
  const fileBuffer = fs.readFileSync(contentFilePath, "utf-8");
  const contentJson = JSON.parse(fileBuffer);

  return contentJson;
}

function exists(): boolean {
  return fs.existsSync(contentFilePath);
}

export { save, load, exists };
