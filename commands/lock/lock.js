const { SnowflakeUtil } = require("discord.js")
const Embeded = require("../../util/embeds.js")
const permission = require("../../util/permissions")

module.exports = class lock {
    static requires = ["client", "msg", "guildConf", "guildData"]
    static helptext = "Prevents users from typing in the channel the command is executed in. Note: Unlocking resets the permission to the group default"
    constructor(client, msg, guildConf, guildData) {

        if(permission.getRole(msg, guildConf, guildConf.modRole) == undefined ||
        permission.getRole(msg, guildConf, guildConf.adminRole) == undefined) return;

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