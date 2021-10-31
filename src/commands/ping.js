const {owners} = require("../config.json");
module.exports = {
    name: "ping",
    run: (client, message, args) => 
    {
        if(owners.includes(message.author.id))
        {
            message.channel.send(`\> - Latence est de **${Date.now() - message.createdTimestamp}ms !** \n\> - La Latence de l'API est **${Math.round(client.ws.ping)}ms !**`).then(msg => { msg.delete({ timeout: 4000 })})
        }
        else
        {
            return;
        }
    },
    help: (message) => {}
}
