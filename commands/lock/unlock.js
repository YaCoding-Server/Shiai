const Embeded = require("../../util/embeds.js")
const permission = require("../../util/permissions")

module.exports = class lock {
    static requires = ["client", "msg", "guildConf"]
    static helptext = "Unlocks the channel it is executed in. Note: Resets permissions to the category default"
    constructor(client, msg, guildConf) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        if(!msg.channel.permissionOverwrites.get(msg.guild.id)) return;
        msg.channel.permissionOverwrites.get(msg.guild.id).delete();

        let embed = new Embeded("Channel has been unlocked", "", 0x5eeb34)
        return msg.channel.send(embed.embed)
    }
}