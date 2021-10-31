const  {MessageEmbed} = require('discord.js');
const color = "33BBFF";
const logo = "https://i.imgur.com/xNBmr8b.png";
const footer = "ZoZ® Music";

module.exports = {

    color: color,
    logo: logo,
    footer: footer,

    /*
     *Embed Play Stop Skip
     */
    playEmbed: function(song) {
    return new MessageEmbed()
         .setColor(color)
         .setTitle("<:Song:888743744197763072> Joue")
         .setDescription(`Titre: \`${song.name}\` - \`${song.formattedDuration}\` | Pour : ${song.user} \n <:Loop:888743744201957456> Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "Server Queue" : "This Song" : "Off"}\``);
    },
    testPlayEmbed: function() {
        new MessageEmbed()
             .setColor(color)
             .setTitle("<:Song:888743744197763072> Joue")
             .setDescription(`Titre: \`LAYLOW - SPECIAL feat NEKFEU & FOUSHEÉ\` - \`03:38\` | Pour : <@559056251150139393> \n <:Loop:888743744201957456> Loop: \`False\``);
    },

    /*
     *Embed Help
     */
     helpEmbed : function() {
        return new MessageEmbed()
         .setTitle("Command Help")
         .setDescription("Ecrivez `*help <nom de la commande>` pour plus d'information sur elle")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "play", value: "Joue un morceau", inline: true},
             {name: "skip", value: "Passe au morceau suivant", inline: true},
             {name: "pause", value: "Met en pause la musique", inline: true},
             {name: "loop", value: "Créé un boucle", inline: true},
             {name: "random", value: "mélange l'ordre de la playlist", inline: true},
             {name: "stop", value: "Deconnecte le bot", inline: true}
         )
         .addField("Information", "Pour plus d'information rejoinez avec le lien : \nhttps://discord.gg/bvRbDg2scT");
    },
    playEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande play")
         .setDescription("La commande **play** permet de jouer la musique selectionner")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliase", value: "`*p`",inline: true},
             {name: "Example", value: "`*play <nom de la musique>`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    skipEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande skip")
         .setDescription("La commande **skip** permet de passer à la commande suivante")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
            {name: "Aliase", value: "`*s`, `*fs`",inline: true},
            {name: "Example", value: "`*skip`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    stopEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande stop")
         .setDescription("La commande **stop** permet de déconnecter le bot du salon")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
            {name: "Aliase", value: "`*deco`, `*deconnecte`, `*leave`",inline: true},
            {name: "Example", value: "`*stop`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    pauseEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande pause")
         .setDescription("La commande **pause** permet de mettre en pause la musique en cour")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*pa`, `*break`", inline: true},
             {name: "Example", value: "`*loop`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    loopEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande loop")
         .setDescription("La commande **pause** permet de mettre en boucle la musique en cour")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*l`", inline: true},
             {name: "Example", value: "`*loop`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    randomEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande random")
         .setDescription("La commande **random** permet de mélanger la playlist")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
            {name: "Example", value: "`*random`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    addlistEmbed : function() {    //en chantier//
        return new MessageEmbed()
         .setTitle("Commande addlist")
         .setDescription("La commande **addlist** permet ")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*playlistadd`", inline: true},
             {name: "Example", value: "`*addlist`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    checkEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande check")
         .setDescription("La commande **check** permet de vérifier si le serveur a encore l'accée a la partit prenium du bot")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*ch`, `*c`", inline: true},
             {name: "Example", value: "`*check`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    playlistEmbed : function() {    //en chantier//
        return new MessageEmbed()
         .setTitle("Commande playlist")
         .setDescription("La commande **playlist** permet ")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*list`", inline: true},
             {name: "Example", value: "`*playlist`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    },
    queueEmbed : function() {
        return new MessageEmbed()
         .setTitle("Commande queue")
         .setDescription("La commande **queue** permet d'afficher la file d'attente")
         .setFooter(footer)
         .setColor(color)
         .setThumbnail(logo)
         .setTimestamp()
         .addFields(
             {name: "Aliases", value: "`*get`, `*getqueue`", inline: true},
             {name: "Example", value: "`*queue`", inline: true}
         )
         .addField("Information", "Pour plus de commandes faites `*help`");
    }
        //MANQUE SEEK, PING, GENERATE//  
}