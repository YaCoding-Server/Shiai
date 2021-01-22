module.exports = client => {
    while(!client.settings.isReady || !client.data.isReady){

    }
    client.settings.fetchEverything();
    client.data.fetchEverything();
    console.log(`Logged in as ${client.user.tag}!`)

    setInterval(() => {
        let datenow = new Date()
        datenow = Date.now()
        datenow = new Date(datenow).getTime()
        client.data.keyArray().forEach(element => {       
            const guild = client.guilds.cache.get(element)
            const challangeChannel = guild.channels.cache.find(c => c.name === client.settings.get(element, "challangeChannel"))
            if (!challangeChannel) {
                return;
            }
            client.data.get(element).events.forEach(event => {
                let enddate = new Date(event.ends).getTime()
                if(enddate < datenow){
                    challangeChannel.send(`-----End of Challange #${event.nr}: ${event.title}-----`)
                    client.data.remove(element,(val)=>val.nr === event.nr,"events");
                }
            });
            if(client.data.get(element).events.length == 0) {
                challangeChannel.overwritePermissions([
                    {
                        id: client.user.id,
                        allow: ['SEND_MESSAGES'],
                    },
                    {
                        id: guild.id,
                        deny: ['SEND_MESSAGES'],
                    }
                ])
            }
        });
    },10000)
  }