module.exports = client => {
    while(!client.settings.isReady){

    }
    client.settings.fetchEverything();
    console.log(`Logged in as ${client.user.tag}!`)
  }