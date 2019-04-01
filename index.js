const express = require("express");
const Discord = require("discord.js");
const tokenJSON = require('./auth.json');
const client = new Discord.Client();

const app = express();

client.on('ready', () => {
  console.log('Bot is up and ready!');
})



const config = {
  port: process.env.PORT || "8080"
};


const token = tokenJSON.token;
client.login(token);

app.listen(config.port, () => {
  console.log("App listening on", config.port);
});