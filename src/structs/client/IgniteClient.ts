import fs from "node:fs";
import { Client } from "discord.js";
import type { IgniteClientOptions } from "./IgniteClientOptions";

/**
 * The base Ignite client class.
 * 
 * @property discordClient - The discord.js {@link Client} object.
 */
export class IgniteClient {
  readonly discordClient: Client;
  readonly basePluginsDir: fs.PathLike;

  constructor(options: IgniteClientOptions) {
    this.discordClient = new Client(options);
    this.basePluginsDir = options.basePluginsDir;
  }

  public async login(token: string) {
    const modules = fs.readdirSync(this.basePluginsDir, { recursive: true });

    this.discordClient.login(token);
  }
}
