const users = require("./users.json");
const express = require("express");
const Discord = require("discord.js");
const tokenJSON = require("./auth.json");
const client = new Discord.Client();

const app = express();
let CHANNELS;

client.on("ready", () => {
  console.log("Bot is up and ready!");
  CHANNELS = Object.values(users).map(obj => {
    return client.channels.get(obj.channelID);
  });
  checkForDailyPost();
});

client.on('message', (message) => {
  console.log(getUserFromMessageData(message));
})

//better describe what this does
const getUserFromMessageData = message => {
  return Object.keys(users).find(user => {
    const userData = users[user];
    return (
      userData.userID === message.author.id &&
      userData.channelID === message.channel.id
    );
  });
};

//Check to see if any user has not posted within designated time limit every 5 minutes
client.setInterval(checkForDailyPost, 300 * 1000)



const checkForDailyPost = () => {
  const messageQueue = Promise.all(
    CHANNELS.map(channel => {
      return channel.fetchMessages({ limit: 1 });
    })
  );
  messageQueue.then(messages => {
    //convert the messages array from an array of Discord.js 'Collections' to an array of objects
    const formattedMessages = messages.map((message) => message.array()[0])
    //Filter out any messages that have been created recently
    const validMessages = formattedMessages.filter(message =>  {
      const user = getUserFromMessageData(message);
      //check that the user's message was the last message in the channel - this is to prevent the bot from spamming them everytime this runs
      return (user && Date.now() - message.createdTimestamp > 86400000);
    });
    validMessages.map(message => {
      message.channel.send(`Hey ${message.author}, it looks like you haven't posted in a while. We'd love to hear how you're doing so far!`);
    })
  });
};



const config = {
  port: process.env.PORT || "8080"
};

const token = tokenJSON.token;
client.login(token);

app.listen(config.port, () => {
  console.log("App listening on", config.port);
});
