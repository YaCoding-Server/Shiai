const Embeded = require("../util/embeds.js")
const permission = require("../util/permissions")

module.exports = class getConf {
    static requires = ["client","msg","parts","guildConf"]
    static helptext = ""
    constructor(client, msg, parts, guildConf) {
        permission.checkRole(msg, guildConf, guildConf.adminRole)

        const [prop] = parts.slice(1);
        if (!prop) {
            let configProps = Object.keys(guildConf).map(prop => {
                return `${prop}:  ${guildConf[prop]}`;
            });

            let embed = new Embeded("Keys:", configProps.join("\n"), 0x5eeb34)
            return msg.channel.send(embed.embed)
        }
        if (!client.settings.has(msg.guild.id, prop)) {
            let embed = new Embeded("Error:", `The key you entered couldn't be found in the Config: ${prop}`, 0xff0000)
            return msg.channel.send(embed.embed)
        }

        let embed = new Embeded(`The value of ${prop} is ${client.settings.get(msg.guild.id, prop)}`, "", 0x5eeb34)
        return msg.channel.send(embed.embed)
    }
}