
const Embeded = require("../util/embeds.js")
const permission = require("../util/permissions")

module.exports = class announce {
    static requires = ["guildConf", "msg", "parts", "client"];
    static helptext = ""
    constructor(guildConf, msg, parts, client) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        const announcementChannel = msg.guild.channels.cache.find(c => c.name === client.settings.get(msg.guild.id, "announcementChannel"))

        if (!announcementChannel) {
            return msg.reply(`The channel ${client.settings.get(msg.guild.id, "announcementChannel")} was not found`)
        }
        let embed = new Embeded(parts[1], parts.slice(2).join(' '), 8717901);
        announcementChannel.send(embed.embed);
    }
}