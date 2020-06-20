const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();
require("./server.js");

const rando_imgs = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

const PREFIX = "!c";
const GOOGLE_API_KEY = "AIzaSyAYQDHwZsdnT-SqOp8T1WdUA74SsWHja0I";

const bot = new Client({
  disableMentions: "all"
});

const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => console.log(`${bot.user.tag} acordou com sucesso!`));
bot.on("shardDisconnect", (event, id) =>
  console.log(
    `O ${id} desconectado (${event.code}) ${event}, tentando se levantar!`
  )
);
bot.on("Shard", id => console.log(`O ${id} esta levantando...`));

bot.on("message", async msg => {
  // eslint-disanble-line
  if (msg.author.bot) return;
  if (!msg.content.startsWith(PREFIX)) return;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);

  if (command === "bert") {
    const bert = new Discord.MessageEmbed();
    msg.channel.send(
      (file = rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
    );
  }
  if (command === "help") {
    const helpembed = new Discord.MessageEmbed()
      .setColor("b50102")
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      .setDescription(
        `
          __***Comandos***__

\`!play [titulo/url]\`|\`Colocar música na queue\`|

\`!search [titulo]\`|\`Para procurar a música\`|

\`!skip\`|\`Para pular a música atual\`|

\`!stop\`|\`Para parar a música atual\`|

\`!resume\`|\`Para ligar novamente a música\`|

\`!nowplaying\`|\`Para saber oque está tocando\`|

\`!queue\`|\`Para abrir a queue\`|

\`!bert\`|\`shitpost\`|

\`!volume [num 1-100]\`|\`Para alterar o volume]\``
      )
      .setFooter("Desenvolvido por Lipolly 2020");
    msg.channel.send(helpembed);
  }
  if (command === "play" || command === "p") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send("Preciso estar num canal para tocar música, inseto!");
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "COMO ASSIM PRECISO DE PERMISSÕES PARA ME CONECTAR NO MEU SERVIDOR??? conserte isso, inseto."
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "COMO ASSIM PRECISO DE PERMISSÕES PARA FALAR NO MEU SERVIDOR??? conserte isso, inseto."
      );
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(
        `<591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** foi adicionado à queue, inseto!`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          var video = await youtube.getVideoByID(videos[0].id);
          if (!video)
            return msg.channel.send("**|**  Essa magia não exite, inseto.");
        } catch (err) {
          console.error(err);
          return msg.channel.send("**|**  Essa magia não exite, inseto.");
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  }
  if (command === "search" || command === "sc") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        "Você precisa estar num canal para pedir música, burro!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "COMO ASSIM PRECISO DE PERMISSÕES PARA ME CONECTAR NO MEU SERVIDOR??? conserte isso, inseto."
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "COMO ASSIM PRECISO DE PERMISSÕES PARA FALAR NO MEU SERVIDOR??? conserte isso, inseto."
      );
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(
        `<591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** foi adicionado à queue, inseto!`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          msg.channel.send(`
__**Seleção de músicas**__

${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}

Você deve me dar um valor para selecionar um dos resultados, de 1-10.
					`);
          // eslint-disable-next-line max-depth
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                max: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              "Ou nada foi selecionado ou ocorreu um erro..."
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("**|**  Essa magia não exite, inseto.");
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "skip") {
    if (!msg.member.voice.channel)
      return msg.channel.send("Preciso estar num canal para tocar música, burro!");
    if (!serverQueue)
      return msg.channel.send("Não é possível skipar aquilo que não existe.");
    serverQueue.connection.dispatcher.end("Não irei mais ouvir esse lixo, skipado!");
    return msg.channel.send("Não irei mais ouvir esse lixo, skipado!");
  } else if (command === "stop") {
    if (!msg.member.voice.channel)
      return msg.channel.send("Preciso estar num canal para tocar música, burro!");
    if (!serverQueue)
      return msg.channel.send("Não é possível parar aquilo que não existe, é tipo eu, porem eu claramente existo.");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "Musica censurada por ser horrorosa."
    );
    return msg.channel.send("Musica censurada por ser horrorosa.");
  } else if (command === "volume" || command === "vol") {
    if (!msg.member.voice.channel)
      return msg.channel.send("Preciso estar num canal para tocar música, burro!");
    if (!serverQueue) return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
    if (!args[1])
      return msg.channel.send(
        `O volume atual é: **\`${serverQueue.volume}%\`**`
      );
    if (isNaN(args[1]) || args[1] > 100)
      return msg.channel.send(
        "As unicas opções de volume são de: **1** - **100**."
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolume(args[1] / 100);
    return msg.channel.send(`Mudei o volume para: **\`${args[1]}%\`**`);
  } else if (command === "nowplaying" || command === "np") {
    if (!serverQueue) return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
    return msg.channel.send(
      `  **|**  Tocando agora: **\`${serverQueue.songs[0].title}\`**`
    );
  } else if (command === "queue" || command === "q") {
    if (!serverQueue) return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
    return msg.channel.send(`
__**Queue**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Tocando agora: \`${serverQueue.songs[0].title}\`**
        `);
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("Musica censurada por ser horrorosa.");
    }
    return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send("Eu toco oque eu quiser!");
    }
    return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
  } else if (command === "loop") {
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return msg.channel.send(
        `:repeat: **|** Loop ${
          serverQueue.loop === true ? "Ligado" : "Desligado"
        }!`
      );
    }
    return msg.channel.send("Você não é capaz de perceber que não tem nada tocando? idiota inutil.");
  }
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(
        `Não consigo me conectar ao canal: **\`${error}\`**`
      );
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else
      return msg.channel.send(
        `<591629527571234819>  **|** **\`${song.title}\`** foi adicionado à queue, inseto!`
      );
  }
  return;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift();
      if (serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      }
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(serverQueue.volume / 100);

  serverQueue.textChannel.send({
    embed: {
      color: "b50102",
      description: `**|**  Começando a tocar este lixo aqui: **\`${song.title}\`**`
    }
  });
}

bot.login(process.env.TOKEN);
