module.exports = {
    name: 'clear',
    description: 'Remueve mensajes de canal',
    execute(message, args, client, prefix, emojis) {

        async function purge() {
            console.log(emojis[0]);
            message.delete();

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                message.channel.send("Necesitas tener el permiso de \`manejar mensajes\`");
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send(`${emojis[0]}` + " Por favor, debes mandar un número en tus argumentos." + `${emojis[1]}` + "\nComando: `" + prefix + "clear <cantidad>`");
                return;
            }

            const fetched = await message.channel.messages.fetch({limit: args[0]});
            console.log(fetched.size + ' mensajes encontrados, eliminando...');

            message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));

            message.channel.send("`" + fetched.size + " mensajes encontrados y eliminados.`").then(m =>{
                m.delete({timeout: 3000});
            });
        }

        purge();

    },
};