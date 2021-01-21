const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const Enmap = require('enmap')

var auth = require('./auth.json')

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: false,
    dataDir: "./res",
    cloneLevel: 'deep'
});

fs.readdir("./events",(err, files) =>{
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

client.login(auth.token)