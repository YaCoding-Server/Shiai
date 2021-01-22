const defaultConfig = require("../res/defaultSettings.json"),
      events = require("events"),
      glob = require( 'glob' ),
      path = require( 'path' );

module.exports = (client, msg) => {
    if(!msg.guild || msg.author.bot) return;

    const guildConf = client.settings.has(msg.guild.id)?
            client.settings.get(msg.guild.id)
        :
            client.settings.ensure(msg.guild.id, defaultConfig.config);

    if(!msg.content.startsWith(guildConf.prefix)) return;
    
    let helptext = [];

    const parts = msg.content.slice(guildConf.prefix.length).split(" "),
    requires = {"client": client, "msg": msg, "parts":parts, "guildConf": guildConf, "helptext": helptext},
    myemmiter = new events.EventEmitter();
    
    let files = glob.sync( './commands/**/*.js' );
    for(let i = 0, filename, f; i != files.length; i++)
        filename = files[i].split('/'),
        f = require(path.resolve(files[i])),
        filename = filename[filename.length-1].match(/[^\.]+/)[0],
        helptext.push({"id": filename, "helptext": f.helptext}),
        myemmiter.on(filename, (msg) => {
            let parameters = [], l = f.requires;
            for(let i = 0; i != l.length; i++)
                parameters.push(requires[l[i]]);
            new f(...parameters);
        });
    /*should be mildly more performant but you should test it cause im dumb*/

    myemmiter.emit(parts[0])
}
