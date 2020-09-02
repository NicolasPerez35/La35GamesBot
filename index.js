const fs = require('fs');
const Discord = require('discord.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const { prefix, token } = require('./src/json/config.json');

const emojis = ['<a:thisr:750618552397987861>','<a:thisl:750618552725274684>','<a:check:750618555912945736>','<a:noCheck:750618558630985748>','<a:FallGuys:750618554092748871>','<a:fakeblob:750618550883844156>','<a:pin:750639898800816168>'];

client.once('ready', () => {
    console.log('Bot encenido');
});


for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('message', async message => {

    if (message.content.startsWith(`${prefix}`)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);


        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        if (command.args && !args.length) {
            return message.channel.send(`No pusiste los argumentos necesarios, ${message.author}!`);
        }

        try {
            command.execute(message, args, client, prefix, emojis);
        } catch (error) {
            console.error(error);
            message.reply('error al ejecutar ese comando!');
        }
    }

});

client.login(token);