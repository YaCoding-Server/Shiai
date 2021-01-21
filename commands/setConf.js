const Embeded = require("../util/embeds.js")
const permission = require("../util/permissions")


module.exports = class setConf {
    static requires = ["client","msg","parts","guildConf"]
    static helptext = ""
    constructor(client,msg,parts,guildConf){
        permission.checkRole(msg,guildConf,guildConf.adminRole)

    const [prop, ...value] = parts.slice(1);
    if(!prop){
        let embed = new Embeded("Error:",`Please specify a key`,0xff0000)
        return msg.channel.send(embed.embed)
    }
    if(!client.settings.has(msg.guild.id, prop)) {
        let embed = new Embeded("Error:",`The key you entered couldn't be found in the Config: ${prop}`,0xff0000)
        return msg.channel.send(embed.embed)
    }
    if(value.join("").length <=0){
        let embed = new Embeded("Error:",`Please specify a value for: ${prop}`,0xff0000)
        return msg.channel.send(embed.embed)
    }
    client.settings.set(msg.guild.id, value.join(" "), prop)

    let embed = new Embeded(`Succesfully updated ${prop} to ${value.join(" ")}`,"",0x5eeb34)
    return msg.channel.send(embed.embed)
    }
}