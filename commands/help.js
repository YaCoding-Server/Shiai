
const Embeded = require("../util/embeds.js")

module.exports = class help {
    static requires = ["msg","parts","helptext"]
    static helptext = "Displays help for all the commands"
    constructor(msg,parts,helptexts) {
        var outtext = ""
        if (parts[1] == undefined) {
            helptexts.map(text => {
                outtext+=text.id+"\n";
            })
            var embed = new Embeded("Commands",outtext,0x5eeb34)
            return msg.channel.send(embed.embed)
        }else {
            helptexts.map(text => {
                if(text.id != parts[1]) return;
                var embed = new Embeded(text.id,text.helptext,0x5eeb34)
                return msg.channel.send(embed.embed)
            })
        }
    }
}