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

client.on('message', (message) => {
  // console.log(message.channel.id);
  // console.log(message.channel.lastMessage.author.id);
  // console.log(message.channel.lastMessage.author.username);
  // console.log(message.channel.lastMessage.content);
  const messageData = {
    userID: message.channel.lastMessage.author.id,
    channelID: message.channel.id
  }

  console.log(getKeyFromValue(users, messageData));
})

const getKeyFromValue = (obj, val) => {
  return Object.keys(obj).find((key) => {
    return Object.values(obj[key])[0] === Object.values(val)[0] && Object.values(obj[key])[1] === Object.values(val)[1];
  })
}


const config = {
  port: process.env.PORT || "8080"
};

const token = tokenJSON.token;
client.login(token);

app.listen(config.port, () => {
  console.log("App listening on", config.port);
});