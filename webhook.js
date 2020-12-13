require('dotenv').config()
const server = require("express")();
const Discord = require("discord.js");
const client = new Discord.Client();
const line = require("@line/bot-sdk");
const request = require("request");
const fs = require("fs")

const line_config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN, 
  channelSecret: process.env.CHANNEL_SECRET
};
  
server.listen(process.env.PORT || 5000)

const bot = new line.Client(line_config);

server.post('/webhook', line.middleware(line_config), (req, res, next) => {
  res.sendStatus(200);
  let events_processed = [];
  req.body.events.forEach((event) => {
  let userId = event.source.userId;
  var options = {
    url: 'https://api.line.me/v2/bot/profile/' + userId,
    headers: {
      'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
    },
    json: true
  };  
    request.get(options, (req, res, next) => {
      let userName = res.body.displayName;
        if (event.type == "message" && event.message.type == "text"){
          var discordnageru = event.message.text
          var important = event.source.groupId
          console.log("This is important:" + important)
          client.channels.cache.get('Discord_Channel_ID').send(
            {embed: {
              title: "LINE Message (Text)",
              description: `From: ${userName}\nMessage: ${discordnageru}`,
              footer: {
                text: "©︎2020 Rintaro Kobayashi -aqua and pink-"
              }              
            }}
          )
        }
        if (event.type == "message" && event.message.type == "file"){
          var filenamae = event.message.fileName
          var fileookisa = event.message.fileSize
          client.channels.cache.get('Discord_Channel_ID').send(
            {embed: {
              title: "LINE Message (File)",
              description: `From: ${userName}\nFile: ${filenamae} : ${fileookisa} Bite`,
              footer: {
                text: "©︎2020 Rintaro Kobayashi -aqua and pink-"
              }    
            }}
          )
        }
        if (event.type == "message" && event.message.type == "location"){
          var jyuusho = event.message.address
          var ido = event.message.latitude
          var keido = event.message.longitude
          client.channels.cache.get('Discord_Channel_ID').send(
            {embed: {
              title: "LINE Message (Location)",
              description: `From: ${userName}\nLocation: ${jyuusho} \nLatitude: ${ido} \nLongitude: ${keido}`,
              footer: {
                text: "©︎2020 Rintaro Kobayashi -aqua and pink-"
              }    
            }}
          )
        }
        if (event.type == "message" && event.message.type == "sticker"){
          var stampnoid = event.message.id
          var stampsetumei = event.message.keywords
          client.channels.cache.get('Discord_Channel_ID').send(
            {embed: {
              title: "LINE Message (Stamp)",
              description: `From: ${userName}\nStampID: ${stampnoid} \nKeywords: ${stampsetumei}`,
              footer: {
                text: "©︎2020 Rintaro Kobayashi -aqua and pink-"
              }    
            }}
          )
        }
        let msgId = event.message.id
        console.log("pppppppp" + msgId)
        if (event.type == "message" && event.message.type == "image")
        var options2 = {
          url: 'https://api-data.line.me/v2/bot/message/' + msgId + "/content",
          headers: {
            'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
          },
          encoding: null
        };  
        request.get(options2, function(error, response, body) {
          if (!error && response.statusCode == 200) {
              fs.writeFileSync(`./image.jpg`, new Buffer.from(body), 'binary');
              console.log('file saved');
              client.channels.cache.get('Discord_Channel_ID').send(
                {embed: {
                  title: "LINE Message (Picture)",
                  description: `From: ${userName}`
                }}
              )
              client.channels.cache.get('Discord_Channel_ID').send(
              { files: ['./image.jpg'] }
              )
          } else {
              console.log('holy shit!')
          }
      });
      })
  })
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});

client.login(process.env.TOKEN)
