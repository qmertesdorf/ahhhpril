const users = require("./users.json");
const express = require("express");
const Discord = require("discord.js");
const tokenJSON = require('./auth.json');
const schedule = require('node-schedule');
const client = new Discord.Client();

const app = express();

let CHANNELS;

client.on('ready', () => {
  console.log('Bot is up and ready!');
  CHANNELS = Object.values(users).map((obj) => {
    return client.channels.get(obj.channelID);
  })
  // console.log(CHANNELS);
  console.log(checkForDailyPost());
});

// client.on('message', (message) => {
//   // console.log(message.createdTimestamp);
//   // console.log(message.channel.lastMessage.createdTimestamp);
//   // console.log(message.author.id);
//   // console.log(message.author.username);
//   // console.log(message.content);
//   const messageData = {
//     userID: message.author.id,
//     channelID: message.channel.id
//   }

//   // console.log(getKeyFromValue(users, messageData));
// })

// client.setInterval(())

const checkForDailyPost = () => {
  const matchingPosts = CHANNELS.filter(channel => {
    //TODO - look into message.array instead of message.map(e => e)
    return mostRecentMessage = channel.fetchMessages({limit: 1}).then(message => Date.now() - message.map(e => e)[0].createdTimestamp);
  })
  return matchingPosts
}

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