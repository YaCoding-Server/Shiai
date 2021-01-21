const Embeded = require("../util/embeds.js")
module.exports.checkRole = (msg,guildConf, roleName) => {
    const Role = msg.guild.roles.cache.find(r => r.name === roleName);
    if((!Role || !msg.member.roles.cache.has(Role.id)) && !msg.member.hasPermission('ADMINISTRATOR')){
        if(!Role){
            let embed = new Embeded("Error:",`The Role: ${roleName} could not be found`,0xff0000)
            return msg.channel.send(embed.embed)
        }
        let embed = new Embeded("Error:",`You dont have the: ${roleName} role`,0xff0000)
        return msg.channel.send(embed.embed)
    }
}
module.exports.getRole = (msg,guildConf, roleName) => {
    const Role = msg.guild.roles.cache.find(r => r.name === roleName);
    if(!Role){
            let embed = new Embeded("Error:",`The Role: ${roleName} could not be found`,0xff0000)
            msg.channel.send(embed.embed)
            return undefined
    }
    return Role;
}