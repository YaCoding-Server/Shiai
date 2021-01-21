const Embeded = require("../util/embeds.js")

module.exports = class ping {
    static requires = ["msg","parts"]
    static helptext = "A test command that just returns the string given as a parameter"
    constructor(msg, parts){
        const embed = new Embeded("Pong!!!",parts.slice(1).join(' '),0x5eeb34);
        msg.channel.send(embed.embed);
    }
}