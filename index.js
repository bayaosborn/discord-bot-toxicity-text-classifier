const toxicity = require('@tensorflow-models/toxicity');
const quotes = require('./quotes.json')
const words = require('./inspire.json')

//INENTS FOR OUR DISCORD BOT
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

//IF DISCORD BOT IS READY AND RUNNING IT WILL LOG IN THE CONSOLE
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});







//LOAD MESSAGE
client.on('messageCreate', async message => {
    if (message.author.bot) return


  //FOR TEST, IF ANY MESSAGE IS SENT ON THE SERVER CONTAINING HELLO, RESPONSE IS TO TAGE THE ADMI WITHT THE REPLY
  if (message.content === 'hello') {
    const admin = message.guild.owner ? message.guild.owner.user.tag : "ADMIN";

    message.reply(`Hello ${admin}, how are you today?`);
  }



    // if (message.mentions.has(client.user)) {
    //     message.reply("Pong!");
    // }

    if (message.content === 'bro') {
        message.reply("G");
    }

  
    if (words.some(word => message.content.includes(word))) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        message.reply(randomQuote);
    }

  //LOAD TOXICITY MODEL
    const model = await toxicity.load();
  const text = message.content;
  const predictions = await model.classify(text);

  const toxReply = []
  predictions.forEach(element => {
    if (element.results[0].match === true) {
      toxReply.push(element)
    }
  })

 const toxicTextArray = []
  toxReply.forEach(label => {
    const toxicText = label.label
    toxicTextArray.push(toxicText)
  })
const sendToxicText = toxicTextArray.join(" and ")
  
if (sendToxicText.length > 0) {
  const admin = message.guild.owner ? message.guild.owner.user.tag : "ADMIN";
  message.reply(`Hello ${admin}, how are you today? Text contains: ${sendToxicText}. `);
}


  
});





client.login(process.env.TOKEN);

