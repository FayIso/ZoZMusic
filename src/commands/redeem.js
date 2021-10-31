const {prefix} = require("../config.json");
const {db} = require("../index.js");

module.exports = {
    name: "redeem",
    aliases: ["redeem"],
    run: (client, message, args) => {
        //// PASSWORD GEN ---> START ////
        function passw(length) {
            var result = [];
            var characters = "ABCD0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result.push(
                    characters.charAt(Math.floor(Math.random() * charactersLength))
                );
            }
            return result.join("");
        }

        //// PASSWORD GEN ---> END ////

        message.delete();
        const claim = args.join(" ");

        if (!claim) {
            message.channel
                .send(`\> Usage: **${prefix}claim** + **<key>** `)
                .then((msg) => {
                    msg.delete({timeout: 4000});
                });
            return;
        } else {
            /*db.query(
                `SELECT * FROM generate WHERE keygen = '${claim}'`,
                async (err, req) => {
                    if (err) throw err;

                    if (req.length < 1) {
                        message.channel.send(
                            `\> ${message.author}, key **doesn't exist** or **already redeemed** <:Error:888743744277463141> ...`
                        );
                    } else {
                        const pass = passw(5);
                        db.query(
                            `SELECT * FROM premium WHERE serverid = '${message.guild.id}'`,
                            async (err, raq) => {
                                if (raq.length < 1) {
                                    // EXISTE PAS //
                                    var normaldate = new Date();
                                    var datenrl =
                                        normaldate.getFullYear() +
                                        "/" +
                                        (normaldate.getMonth() + 1) +
                                        "/" +
                                        normaldate.getDate();

                                    db.query(
                                        `INSERT INTO premium (authorid, discord, serverid, servername, keyclaim, date) VALUES ('${message.author.id}', '${message.author.tag}', '${message.guild.id}', '${message.guild.name}', '${claim}', '${datenrl}')`,
                                        (err, req) => {
                                            console.log(err);
                                            message.author.createDM().then((channel) => {
                                                channel.send(
                                                    `**_You are use ZoZ® Premium Key in __${message.guild.name}__ _** \n\n\> \`\`Please don't forget your pass !\`\`\n\n\> Pass : \`\`${pass}\`\`\n\n If you have question contact **ZoZ Administrator** !`
                                                );
                                            });
                                        }
                                    );
                                    message.channel.send(
                                        `\> ${message.author}, key successfull redeemed ! **Server have become a Premium ZoZ® Server** <:Sucess:888743744105492541> !`
                                    );
                                    db.query(`DELETE FROM generate WHERE keygen = '${claim}'`);
                                } else {
                                    message.channel.send(
                                        `\> ${message.author}, This server are already an active **Premium ZoZ® License**`
                                    );
                                }
                            }
                        );
                    }
                }
            );*/
        }
    },
    help: (message) => {}
};