const Embeded = require("../../util/embeds.js")
const permission = require("../../util/permissions")

module.exports = class lock {
    static requires = ["client", "msg", "guildConf"]
    static helptext = ""
    constructor(client, msg, guildConf) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        msg.channel.overwritePermissions([
            {
                id: msg.guild.id,
                deny: ['SEND_MESSAGES'],
            },
            {
                id: client.user.id,
                allow: ['SEND_MESSAGES'],
            },
            {
                id: msg.author.id,
                allow: ['SEND_MESSAGES'],
            },
            {
                id: permission.getRole(msg, guildConf, guildConf.adminRole),
                allow: ['SEND_MESSAGES'],
            },
            {
                id: permission.getRole(msg, guildConf, guildConf.modRole),
                allow: ['SEND_MESSAGES'],
            },
        ])

        let embed = new Embeded("Channel has been locked", "", 0x5eeb34)
        return msg.channel.send(embed.embed)
    }
}