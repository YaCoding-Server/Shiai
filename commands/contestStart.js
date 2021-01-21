const Discord = require("discord.js")
const permission = require("../util/permissions")

module.exports = class contestStart {
    static requires = ["client", "msg", "parts", "guildConf"]
    static helptext = "Is used to start contests. Parts of the embed are split using |. Part order: 0 Coding contest nbr, 1 Title, 2 Description, 3 goals, 4 bonus goals,5 end date"
    constructor(client,msg,parts,guildConf) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        const announcementChannel = msg.guild.channels.cache.find(c => c.name === client.settings.get(msg.guild.id, "announcementChannel"))

        const partss = parts.slice(1).join(" ").split("|")

        if (!announcementChannel) {
            return msg.reply(`The channel ${client.settings.get(msg.guild.id, "announcementChannel")} was not found`)
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`Ya Coding Coding Contest #${partss[0]}: ${partss[1]}`)
            .setAuthor('Ya Coding Administration')
            .setDescription(partss[2])
            .addFields({ name: "Goals", value: partss[3], inline: true }, { name: "Bonus Goals", value: partss[4], inline: true })
            .setTimestamp()
            .setFooter('Contest ends on: ' + partss[5])
        announcementChannel.send(embed);
    }
}