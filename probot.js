const Discord = require('discord.js');
const moment = require("moment");  
const fs = require("fs");      
const dateFormat = require('dateformat');
const client = new Discord.Client(); 
const Canvas = require("canvas"); 
const prefix = "#"

let userData = require("../userData.json");

module.exports.run = async (bot, message, args,prefix) => {
	    if (!args[0]) {
        message.channel.send(`**${prefix}تحويل  <User> <Number Of Crdit>**`);
         return;
           }
        // We should also make sure that args[0] is a number
        if (isNaN(args[1])) {
            message.channel.send(`**${prefix}تحويل <User> <Number Of Crdit>**`)
            return; // Remember to return if you are sending an error message! So the rest of the code doesn't run.
             }
			 	const no = ['-'];
      if (args[1].startsWith(no)) return message.reply("لايمكن تحويل رقم سالب")
            let defineduser = '';
            let firstMentioned = message.mentions.users.first() || message.guild.members.get(args[0]);
            defineduser = (firstMentioned)
            if (!defineduser) return message.channel.send(`**${prefix}تحويل <User> <Number Of Crdit>**`)

            var mentionned = message.mentions.users.first() || message.guild.members.get(args[0]);
  if(userData[message.author.id].credit < args[1]) return message.reply("ليس معك هذا الكم من الكردت");
  if(!userData[defineduser.id]){
    userData[defineduser.id] = {
      xp: 0,
	  credit : 0,
      level: 1,
	  like : 0,
	  ane : "&عني"
    };
  }
  
  
      userData[defineduser.id].credit += args[1];
      userData[message.author.id].credit -= args[1];

 fs.writeFile("./userData.json", JSON.stringify(userData, null, 4), (err) => {
   if(err) console.log(err)
 });

      let mariam = message.author.username
message.channel.send('`' + mentionned.username + '`' + '** تم التحويل **'+ '`' + mariam + '`' + '**المبلغ**'+ (args[1]) + '** :dollar: **')

}

module.exports.help = {
  name: "تحويل"
}


let profile = JSON.parse(fs.readFileSync("profile.json", "utf8"))
client.on("message", message => {
 
  if (message.author.bot) return;
  if(!message.channel.guild)return;
  if (!profile[message.author.id]) profile[message.author.id] = {
    tite: 'Super User',
    rep: 0,
    reps: 'NOT YET',
    lastDaily:'Not Collected',
    level: 0,
    points: 0,
    credits: 150,
  };
 
 
fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
 
 
client.on("message", (message) => {
  let men = message.mentions.users.first()
 
  if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + 'credit')) {
  if(men) {
    if (!profile[men.id]) profile[men.id] = {
    lastDaily:'Not Collected',
    credits: 1,
  };
  }
  if(men) {
message.channel.send(`** ${men.username}, :credit_card: balance` + " is `" + `${profile[men.id].credits}$` + "`.**")
} else {
  message.channel.send(`** ${message.author.username}, your :credit_card: balance` + " is `" + `${profile[message.author.id].credits}$` + "`.**")
}
}
 
if(message.content.startsWith(prefix + "dailymymymymymymdowdowjdwoow")) {
  if(profile[message.author.id].lastDaily != moment().format('day')) {
    profile[message.author.id].lastDaily = moment().format('day')
    profile[message.author.id].credits += 3000000
     message.channel.send(`**${message.author.username} you collect your \`160\` :dollar: daily pounds**`)
} else {
    message.channel.send(`**:stopwatch: | ${message.author.username}, your daily :yen: credits refreshes ${moment().endOf('day').fromNow()}**`)
}
  }
let cont = message.content.slice(prefix.length).split(" ");
let args = cont.slice(1);
let sender = message.author
if(message.content.startsWith(prefix + 'trans')) {
          if (!args[0]) {
            message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
         return;
           }
        // We should also make sure that args[0] is a number
        if (isNaN(args[0])) {
            message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
            return; // Remember to return if you are sending an error message! So the rest of the code doesn't run.
             }
            let defineduser = '';
            let firstMentioned = message.mentions.users.first();
            defineduser = (firstMentioned)
            if (!defineduser) return message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
            var mentionned = message.mentions.users.first();
if (!profile[sender.id]) profile[sender.id] = {}
if (!profile[sender.id].credits) profile[sender.id].credits = 200;
fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      var mando = message.mentions.users.id;
      if  (!profile[defineduser.id]) profile[defineduser.id] = {}
      if (!profile[defineduser.id].credits) profile[defineduser.id].credits = 200;
      profile[defineduser.id].credits += (+args[0]);
      profile[sender.id].credits += (-args[0]);
      let mariam = message.author.username
message.channel.send(`**:moneybag: | ${message.author.username}, has transferrerd ` + "`" + args[0] + "$` to " + `<@${defineduser.id}>**`)
}
 
      });




client.login(process.env.BOT_TOKEN);
