require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();
const line = require('@line/bot-sdk')
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};
const client2 = new line.Client(config)

client.on('ready', () => {
    client.user.setActivity('Kusawwww', {
      type: 'PLAYING'
    });
    console.log("bot is ready!");
  })

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.includes("testaqua")){
        message.channel.send("aqua-and-pink started successfly.")
    }
    if (message.content.includes("helpaqua")){
        message.channel.send(
            {embed: {
                color: 16757683,
                title: "HELP Mode",
                description: `
                aqua-and-pink is the perfect bot that can connect Discord and LINE.

                🛠Developer: Rintaro Kobayashi (https://github.com/K-Rintaro)
                `
            }}
        )
    }
})

var naiyou;
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.attachments.size > 0) {
        naiyou = message.attachments.array()[0].url;
    }else{
        naiyou = message.content
    }
})

var donata;
client.on("message", async message => {
    if (message.author.bot) return;
    donata = message.member.nickname;
})

var iconhoshii;
client.on("message", async message => {
    if (message.author.bot) return;
    iconhoshii = message.author.displayAvatarURL().replace(".webp", ".png");
})

const convertMsg = (message) => {
    return{
        type: "text",
        text: naiyou,
        sender: {
            name: donata,
            iconUrl: iconhoshii
        }
    }
}

client.on("message", async (msg) => {
    if (msg.channel.id === "Discord_Channel_ID"){
        try{
            if (msg.author.bot) return;
            const message = convertMsg(msg)
            await client2.pushMessage(
                process.env.CHANNEL_ID,
                message,
            )
        }catch(error) {
            console.error(error);
        }
    }
})

client.login(process.env.TOKEN)
