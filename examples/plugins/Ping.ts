import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommandComponent } from "../../src/index.js";

export default new SlashCommandComponent(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot's latency"),
  async (interaction) => {
    const embed = new EmbedBuilder();

    const interactionLatency = Date.now() - interaction.createdTimestamp;
    embed.addFields({
      name: "Interaction latency",
      value: `${interactionLatency}ms`,
    });

    if (interaction.client.ws.ping === -1) {
      embed.addFields({
        name: "WebSocket ping",
        value: "N/A",
      });
    } else {
      embed.addFields({
        name: "WebSocket ping",
        value: `${interaction.client.ws.ping}ms`,
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
);
