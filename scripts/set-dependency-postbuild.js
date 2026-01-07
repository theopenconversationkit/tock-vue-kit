import fs from "fs";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

packageJson.dependencies["tock-vue-kit"] = "file:../tock-vue-kit";
packageJson.dependencies["tock-vue-kit-editor"] = "file:../tock-vue-kit-editor";

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2) + "\n");

console.log(
  `→ Dev: restored tock-vue-kit and tock-vue-kit-editor to local path (file:../tock-vue-kit)`
);
