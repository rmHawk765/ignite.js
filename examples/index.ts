import { IgniteClient } from "../src/index.js";

const client = new IgniteClient({ intents: [], basePluginsDir: "./plugins/" });

await client.login("");
