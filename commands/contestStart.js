const Discord = require("discord.js")
const permission = require("../util/permissions")

module.exports = class contestStart {
    static requires = ["client", "msg", "parts", "guildConf","guildData"]
    static helptext = "Is used to start contests. Parts of the embed are split using |. Part order: 0 Coding contest nbr, 1 Title, 2 Description, 3 goals, 4 bonus goals, 5 run time(in days)"
    constructor(client,msg,parts,guildConf,guildData) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        const announcementChannel = msg.guild.channels.cache.find(c => c.name === client.settings.get(msg.guild.id, "announcementChannel"))

        const partss = parts.slice(1).join(" ").split("|")
        let enddate = new Date(Date.now());
         enddate.setDate(enddate.getUTCDate() + parseInt(partss[5]))

        if (!announcementChannel) {
            return msg.reply(`The channel ${client.settings.get(msg.guild.id, "announcementChannel")} was not found`)
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`Ya Coding Coding Contest #${partss[0]}: ${partss[1]}`)
            .setAuthor('Ya Coding Administration')
            .setDescription(partss[2])
            .addFields({ name: "Goals", value: partss[3], inline: true }, { name: "Bonus Goals", value: partss[4], inline: true })
            .setTimestamp()
            .setFooter('Contest ends on: ' + enddate.getFullYear() + "." + (enddate.getUTCMonth() + 1) + "." + enddate.getUTCDate() + " " + enddate.getUTCHours()+":"+enddate.getUTCMinutes() + " UTC+0");

        client.data.push(msg.guild.id,{"nr":partss[0],"title":partss[1],"ends": enddate},"events")
        announcementChannel.send(embed);
    }
}