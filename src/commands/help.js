const embedHelp = require("../utils/embedRessource")
const index = require('../index.js')

const indexEmbed = [
    ["play", embedHelp.playEmbed(), "free"],
    ["skip", embedHelp.skipEmbed(), "free"],
    ["stop", embedHelp.stopEmbed(), "free"],
    ["pause", embedHelp.pauseEmbed(), "free"],
    ["loop", embedHelp.loopEmbed(), "free"],
    ["random", embedHelp.randomEmbed(), "free"],
    ["addlist", embedHelp.addlistEmbed(), "prenium"],
    ["check", embedHelp.checkEmbed(), "prenium"],
    ["playlist", embedHelp.playlistEmbed(), "prenium"],
    ["queue", embedHelp.queueEmbed(), "prenium"]
  ];

module.exports = {
    name: "help",
    aliase: ["help"],
    run: (client, message, args) => 
    {
        indexEmbed.forEach(element => {
          if (element[0] == args) {
            if (element[2] === "prenium") {
              let find = false;
              index.db.query(`SELECT * FROM premium WHERE serverid = '${message.guild.id}'`, async (err, req) =>
              {
                if(err) throw err;
                if(req.length >= 1) 
                {
                  message.channel.send(element[1]);
                  find = true;
                }
                else
                {
                  message.channel.send(`\> This Server doesn't have a **Premium ZoZ® License**`).then(msg => { msg.delete({ timeout: 4000 })});
                  return;
                }
              })
            } else {
              message.channel.send(element[1]);
              find = true;
            }
          };
        });
        if (!find) {
          message.channel.send(embedHelp.helpEmbed());
        };
      },
};