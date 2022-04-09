module.exports = {
  name: "gimme",
  description: "A handy command to get some things you want",
  args: true,
  usage: "gimme <avatar|image> <...args>",
  guildOnly: true,
  execute(message, args) {
    if (args[0] === "avatar") {
      const sprites = [
        "male",
        "female",
        "human",
        "identicon",
        "initials",
        "bottts",
        "avataaars",
        "jdenticon",
        "gridy",
        "micah",
      ];

      const selectedSprite = sprites.includes(args[1])
        ? args[1]
        : sprites[Math.floor(Math.random() * sprites.length)];

      message.channel.send(
        `https://avatars.dicebear.com/api/${selectedSprite}/${
          args[2] || Math.random()
        }.svg`
      );
    } else if (args[0] === "image") {
      const firstDimension = typeof args[1] === "number" ? args[1] : 500;
      const secondDimension = typeof args[2] === "number" ? args[2] : 500;
      message.channel.send(
        `https://picsum.photos/${firstDimension}/${secondDimension}`
      );
    }
  },
};
