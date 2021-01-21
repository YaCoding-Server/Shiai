const defaultConfig = require("../res/defaultSettings.json")
const events = require("events")
const glob = require( 'glob' )
const path = require( 'path' )

module.exports = (client, msg) => {
    if(!msg.guild || msg.author.bot) return;
    const guildConf = (client.settings.has(msg.guild.id))? client.settings.get(msg.guild.id):client.settings.ensure(msg.guild.id, defaultConfig.config);
    if(!msg.content.startsWith(guildConf.prefix)) return;

    var ids = [], objects = {};
    glob.sync( './commands/**/*.js' ).map(( file ) => {
        const filename = file.split('/')[file.split('/').length-1].split('.')[0]
        objects[filename] = require(path.resolve(file))
        ids.push(filename)
    });

    const parts = msg.content.slice(guildConf.prefix.length).split(" ");
    var helptext = []
    const requires = {"client": client, "msg": msg, "parts":parts, "guildConf": guildConf, "helptext": helptext}

    const myemmiter = new events.EventEmitter();

    ids.map((id) => {
        helptext.push({"id": id, "helptext": objects[id].helptext});
        myemmiter.on(id, (msg) => {
            var parameters = [];
            objects[id].requires.map(part => {
                parameters.push(requires[part])
            })
            new objects[id](...parameters);
        })
    })

    myemmiter.emit(parts[0])
}
