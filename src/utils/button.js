const {MessageActionRow, MessageButton} = require("discord.js")

const row = new MessageActionRow().addComponents(
     /*
     Button embed play
     */
     new MessageButton()
          .setStyle("SUCCESS")
          .setLabel("Play/Resume")
          .setCustomId("idPlay"),
          
     new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Skip")
          .setCustomId("idSkip"),

     new MessageButton()
          .setStyle("DANGER")
          .setLabel("Stop")
          .setCustomId("idStop"),

     /*
     new MessageButton()
          .setStyle("blurple")
          .setLabel("Queue")
          .setCustomId("idList"),
     */
);

module.exports = {
     row: row
}