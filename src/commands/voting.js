import EmbedVotacion from './src/class/EmbedVotacion.js';
import embedvotacion from './index.js';
import cont from './index.js';

const Discord = require('discord.js');
module.exports = {
	name: 'poll',
	description: 'Sistema de votación',
	async execute(message, args, client, prefix, emojis) {
        cont++;
        console.log(args);

        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new Discord.MessageEmbed()
        .setTitle('Votacion Nº ' + cont)
        .setDescription(pollDescription)
        .setColor('#13fb98')
        .setTimestamp(message.createdAt)
        .setAuthor(message.member.nickname, message.author.displayAvatarURL())
        .setFooter('La 35 Games')

        pollChannel.send("|| @everyone ||\n " + `${emojis[0]}` + "nueva votación en curso, por favor, votar");
        let reaccionar = await pollChannel.send(embedPoll);
        reaccionar.react('750618555912945736');
        reaccionar.react('750618558630985748');

        embedvotacion.push(new EmbedVotacion(reaccionar, cont));
        },
};