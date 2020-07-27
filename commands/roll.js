module.exports = {
  name: "roll",
  description: "A command that rolls a RPG dice for you if you want to. 😉",
  args: true,
  usage: "roll <NUMBER-OF-DICE-FACES>",
  guildOnly: false,
  execute(message, args) {
    const number = parseInt(args[0], 10);
    const result = (Math.random() * (number - 1)) + 1;
    message.channel.send(`🧙‍♂️ Your magic number for D${args[0]} is: ${Math.ceil(result)}`);
  },
};