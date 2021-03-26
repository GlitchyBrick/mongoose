const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose')
const { connect } = require('mongoose')
const GuildModel = require('./models/Guild')
const ArsenalModel = require('./models/Arsenal')
const token = 'NzkyODU3NjU3OTQ1NjIwNDkw.X-j0PA.vIreMrJTviwmKjg9EYJdzzilTmQ';
var logo = 'https://cdn.discordapp.com/avatars/790889939365265449/4d6055ae439a2dec9215b6a1a30ef8be.png?size=256'

client.on('ready', () => {
    console.log(client.user.username + "is Ready!")
})

client.on('ready', async () => {
    await connect('mongodb+srv://Glitch:exbXGDQWjFoY4FwO@cluster0.hd5kc.mongodb.net/Data', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
})

client.on("guildCreate", async function(guild){
    console.log(`the client joins a guild | ${guild.id}`);
    const doc = new GuildModel({id: guild.id});
    await doc.save();
    console.log('New Doc Has been Made Defult Prefix: -')
});

client.on("guildDelete", async function(guild){
    console.log(`the client left a guild | ${guild.id}`);
    const doc = await GuildModel.findOneAndDelete({ id: guild.id });
    return console.log('deleted doc')
});

/*client.on('message', async message => {
    if(message.content === `create`) {
        const doc = new GuildModel({id: message.guild.id});
        await doc.save();
        message.reply('New Doc Has been Made Defult Prefix: -')
    }
})*/


/*client.on('message', async message => {
    if (message.content === `${prefix}prefix`) {

        const req = await GuildModel.findOne({id: message.guild.id})
        if(!req) return message.reply('Sorry doc dosent exist')
        return message.reply(`Found a doc prefix: ${req.prefix}`)

    }else if (message.content === `${prefix}prefix =`) {

        const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id }, { $set: { prefix:'='} }, {new: true});
        return message.reply(`Set Prefix to ${doc.prefix}.`)
        
    }else if (message.content === `${prefix}remove`) {

        const doc = await GuildModel.findOneAndDelete({ id: message.guild.id });
        return message.reply('deleted doc')
        
    }
})*/

client.on('message', async message => {
    const req = await GuildModel.findOne({id: message.guild.id})
    const prefix = req.prefix

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();
  

    if(cmd === 'prefix') {
        if (!args[1]) {

            const req = await GuildModel.findOne({id: message.guild.id})
            if(!req) return message.reply('Sorry doc dosent exist')
            return message.reply(`Found a doc prefix: ${req.prefix}`)

        }else if (args[1]) {
            if(args[2]) return message.reply('Too many arguments.');
            const doc = await GuildModel.findOneAndUpdate({ id: message.guild.id }, { $set: { prefix: args[1] } }, {new: true});
            return message.reply(`Set Prefix to ${doc.prefix}.`)
        } 
    }

    if(cmd === 'arsenal') {
        const req = await ArsenalModel.findOne({id: message.guild.id})
        if(!req) return message.reply('Sorry doc dosent exist')

        const embed = new Discord.MessageEmbed()
        embed.setTitle('The USSR Arsenal')
        embed.setDescription('This is the Stock For the USSR Arsenal')
        embed.addField('<:AK47:822840891525824523> AK47', req.AK, true)
        embed.addField('<:pm_makarov:822840923934425099> Pistols', req.Pistols, true)
        embed.addField('<:shoty:823634703390343199> Shotguns', req.Shotgun, true)
        embed.addField('<:rpg:822914813256269904> RPG', req.RPG, true)
        embed.addField('<:unnamed:822918094455832626> Snipers', req.Snipers, true)
        embed.addField('<:FighterPlanePNGImage1:822916377702301747> Fighter Jets', req.Jets, true)
        embed.addField('<:nuke:822915274238853140> Nukes', req.Nukes, true)
        embed.addField('<:SHRESH:823631030585131031> Attack Heli', req.Heli, true)
        embed.addField('<:air:823636536791662603> Aircraft Carriers', req.Aircraft, true)
        embed.addField('<:sad:823631705813417984> Submarines', req.Submerine, true)
        embed.addField('<:YYEN:823633041036935199> Ships', req.Ship, true)
        embed.addField('<:old:823633858963832842> Tanks', req.Tank, true)
        embed.setFooter('Bot Made By Gl1thy#0001', logo)
        embed.setColor('RANDOM')
        embed.setTimestamp()
        embed.setThumbnail(logo)

        message.channel.send(embed)
    }

    if(cmd === 'data') {
    const doc = new ArsenalModel({id: message.guild.id});
    await doc.save();
    console.log('New Doc Has been Made For Arsenal')
    message.channel.send('New Doc Has been Made For Arsenal')
    }

    if(cmd === 'add ak47') {
        
        var Wepond = args[1]
        var Amount = args[2]
        const amount = parseInt(args[2]);

        if (!Wepond) return message.channel.send('You didnt menstion What u want to add')
        if (!Amount) return message.channel.send('How much do u want to add')
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }

        if(Wepond === 'AK47' || 'ak47') {
            const req = await ArsenalModel.findOne({id: message.guild.id})
            if(!req) return message.reply('Sorry doc dosent exist')

            const doc = await ArsenalModel.findOneAndUpdate({ id: message.guild.id }, { $inc: { AK: Amount } }, {new: true});
            return message.reply(`Added ${Amount} to ${Wepond}`)
        }else return;
    }

    if(cmd === 'add') {
        
        var Wepond = args[1]
        var Amount = args[2]
        const amount = parseInt(args[2]);

        if (!Wepond) return message.channel.send('You didnt menstion What u want to add')
        if (!Amount) return message.channel.send('How much do u want to add')
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }

        if (Wepond === 'Pistol' || 'Pistols' || 'pistol' || 'pistols') {
            const req = await ArsenalModel.findOne({id: message.guild.id})
            if(!req) return message.reply('Sorry doc dosent exist')

            const doc = await ArsenalModel.findOneAndUpdate({ id: message.guild.id }, { $inc: { Pistols: Amount } }, {new: true});
            return message.reply(`Added ${Amount} to ${Wepond}`)
        }else return;

    }
})

client.login(token);
