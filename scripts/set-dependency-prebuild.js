import fs from "fs";
import { createRequire } from "module";
import { execSync } from "child_process";

const require = createRequire(import.meta.url);
const config = require("../config.json");
const packageJson = require("../package.json");

console.log(
  `→ Build: using tock-vue-kit@${config.tockVueKit.version} and tock-vue-kit-editor@${config.tockVueKitEditor.version}`
);

// Met à jour package.json avec la version publiée avant le build
packageJson.dependencies["tock-vue-kit"] = config.tockVueKit.version;
packageJson.dependencies["tock-vue-kit-editor"] =
  config.tockVueKitEditor.version;

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2) + "\n");

console.log("Installing the published versions...");
execSync(`npm install tock-vue-kit@${config.tockVueKit.version}`, {
  stdio: "inherit",
});
execSync(`npm install tock-vue-kit-editor@${config.tockVueKitEditor.version}`, {
  stdio: "inherit",
});

console.log("Installation completed.");
