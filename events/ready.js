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
            client.data.get(element).events.forEach(event => {
                let enddate = new Date(event.ends).getTime()
                if(enddate < datenow){
                    //TODO - Implement handling of ending a event
                    client.data.remove(element,(val)=>val.nr === event.nr,"events");
                }
            });
        });
    },10000)
  }