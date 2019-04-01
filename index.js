const users = require("./users.json");
const express = require("express");
const Discord = require("discord.js");
const tokenJSON = require('./auth.json');
const schedule = require('node-schedule');
const client = new Discord.Client();

const app = express();



client.on('ready', () => {
  console.log('Bot is up and ready!');
});

const config = {
  port: process.env.PORT || "8080"
};

console.log(users);
const token = tokenJSON.token;
client.login(token);

app.listen(config.port, () => {
  console.log("App listening on", config.port);
});