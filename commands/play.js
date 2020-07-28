const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {
  name: "play",
  description: "Listen to your favorite songs with the powers of Salazar!",
  args: true,
  usage: "play <NAME-OF-THE-MUSIC-YOU-WANT-TO-HEAR>",
  guildOnly: true,
  async execute(message, args) {
    if (message.channel.type !== 'text') return;

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply('In order for the Grand Master Salazar to play this, you\'ll need to join a voice channel first!');
    }

    let song;

    if (await ytdl.validateURL(args[0])) {
      const songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.title,
        url: songInfo.video_url
      };
    } else {
      const { videos } = await yts(args.slice(1).join(" "));
      if (!videos.length) return message.channel.send("I do not recognize this kind of dark art!");
      song = {
        title: videos[0].title,
        url: videos[0].url
      };
    }


    voiceChannel.join().then(connection => {
      const stream = ytdl(song.url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => voiceChannel.leave());
    });
  }
};