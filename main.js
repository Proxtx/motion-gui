import { listen } from "@proxtx/framework";
import { setConfig } from "@proxtx/framework/static.js";
import config from "@proxtx/config";

setConfig({ customScriptFileExtensions: [".html", ".route"] });
await listen(config.port);
console.log("Server running. Port:", config.port);
