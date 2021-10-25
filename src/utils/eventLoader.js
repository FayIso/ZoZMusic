const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
    client.on('messageCreate', reqEvent('message'));
    client.on('guildCreate', reqEvent('guildCreate'));
};