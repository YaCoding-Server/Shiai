const Discord = require("discord.js");

module.exports = class Embeded{
    constructor(title = "", description = "", color = 0xffffff){
        this.embeded = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description);
    }
    get embed(){
        return this.embeded;
    }
}