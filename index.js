const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();
require("./server.js");

const rep = [
  "Que porra de pergunta é esta, inseto?",
  "com toda certeza",
  "Com toda a minha sabedoria e superioridade, a resposta é SIM.",
  "Com toda a minha sabedoria e superioridade, a resposta é NÃO.",
  "Talvez daqui uns milenios.",
  "Jamais, inseto.",
  "Incrivel como a sua pequenes é surpreendentemente nojenta. SUMA DA MINHA FRENTE COM ESSAS PERGUNTAS HORRIVEIS.",
  "A resposta não deve ser dada para essas questões, inseto.",
  "Creio que é possivel.",
  "Pergunte para outro lacaio, estou muito ocupado gerenciando as almas.",
  "Tão certo quanto a existencia dos precursores do caos..."
];
const rando_imgs = [
  "https://cdn.discordapp.com/attachments/723006025686581330/723006077171531816/5733aee659c8f.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006077821779988/571fdd69dc67c.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006080401145866/5737a4af0cc00.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006083630891008/51654becd881987a17231585ee75a4fa.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006087284129862/131123836-288-k669496.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006092929400903/04211655440286.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006095689252914/04211942282290.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006100424622080/08231339369619.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006103041998991/30162536215330.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006110331568128/a7c32ee2110a7be392f6617ba525354b.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006122427940864/o.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006129080107128/q.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006129080107128/q.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006131802210315/s.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006135052927066/g.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006150215204864/images.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006166434578432/tumblr_418186245489e43c876ec3487d53dc06_7320ea17_640.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006195371081728/6d3036c7a411e2f321881b7cb7d92612.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006195643711488/59ae71f366066.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006196377714698/5cbf264fb9d50.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006197032157305/95dfebb08958bd78c2852400d3ed37db.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006209107689532/6b5d35258868e85f4ad6f7f4874dea9a.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006211825598514/55f897f03e73b.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006213184553020/obn6lwrrswi41.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/723006326191685712/0d3f34b021aa08230580c6131c08536d854b0e8c_00.gif",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038631702003864/2a90c4f28b9bcf324ef60bc3833ff609.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038644641300500/4a75ccfcfbf54c25d9e495f2d5dabd7b95030342r1-964-1064v2_hq.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038655420661790/4c7aa04c52d4779b54c3dbfef716f7bf.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038657027342406/5ab136a47c976.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038666434904064/5bccfeb0115ee6e07a71911a3a307437.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038669597409320/12c82f6bc64475c57f394930cbc248e1.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038673808752660/59ecb9d11c7f6.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038694763233310/98dc4208fe23b184b0d16b09e8d74a82.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038698710335550/5723e6d4b4c04.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038703546368000/12143338160109.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038724765220874/download_1.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038731308204042/download_2.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038739000819712/28131342825076.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038739135037480/download.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038752544227328/d94d0f97aa5653d55dcea770c119215290893c26r1-1818-2048v2_00.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038773796634684/images_1.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038784387252234/images_2.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038784873660467/ec5b7a4b93aa38aa1386087c88622151.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038795384717372/images_4.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038795405688892/images_3.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038799738404955/5723e99775162.jpeg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038804767506442/images_6.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038804922695780/images.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038805413429349/images_5.jpg",
  "https://cdn.discordapp.com/attachments/723006025686581330/724038834937004073/memes-8.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446543129608272/7751318763d61ecb77fcb8017c5b2ebc.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446551962943518/08024257574563.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446558220845126/cac9a84cff99ba5076be9ffcc8aa29f2.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446565758140537/cbf5cd7aae465f8507f8ee222a50a6d1.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446570602299432/d5ec43bba1cb9cf5f229f0063bb79e6a.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446576172597260/efaf0c6a12d82ddf1ed1fdfddedd0ec6.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446591229886534/images.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446591561236561/ETeaU8oXQAMpitr.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446597668405288/0b99a1643ead8007557f9fbc9bd51d57.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446605645971536/0cef098e00b9c7660a5a8133c89d10e2.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446616697831474/0fe246092f9521351a517d1e122eaf28.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446619495563264/5baa89c16362294239942cfb2289dec0.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446625921237062/5e777f4639f86.jpeg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446633730768936/8bf56088c13e3ff096e101acf4392e64.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446638688698388/21a3e9bbb4c67779b67ac8128a12b360.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446649778176040/837d0c6bf4fc2b727093dc2f2be9a9e4.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446655189090384/900ab6614c7adaeafd14678f42a249b8.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/724446656879132763/6211bcc2897b00a48c617b9c8543c7ab.jpg"
];
const listpreso = [
  'https://cdn.discordapp.com/attachments/718541595892383815/725073039238365254/ce9c02b8b5a66dcfe5446d3b8a09306f.gif',
  'https://cdn.discordapp.com/attachments/718541595892383815/725073105667621024/tumblr_mz3j4lAIPn1qe89guo1_500.gif',
  'https://cdn.discordapp.com/attachments/718541595892383815/725073168846291044/OpulentSlushyKakapo-size_restricted.gif'
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
bot.on("ready", () => {
  i = 0;
setInterval( () => bot.user.setActivity(`Seu sofrimento...`, {
      type: "WATCHING"
    }), 1000 * 60); 
bot.user
    .setStatus("dnd")
    .catch(console.error);
console.log(`${bot.user.tag} acordou!`)
});
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

  const replies = rep[Math.floor(Math.random() * rep.length)];
  const file = rando_imgs[Math.floor(Math.random() * rando_imgs.length)];

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);

if (command ==="pris") {
  const rand = listpreso[Math.floor(Math.random() * listpreso.length)];
  const user = msg.mentions.users.first() || bot.users.cache.get(args[0]);
  if (!user) {
    const respse = new Discord.MessageEmbed()
    .setColor("b50102")
    .setDescription("Preciso de um nome para prender, inseto!")
  return msg.reply(respse);}

  let users = msg.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
  
  let avatar = users.avatarURL({ dynamic: true, format: "png", size: 1024 });

    const cpreso = new Discord.MessageEmbed()

          .setColor('b50102')
          .setDescription(`O ${user} foi caçado pelos 7 caes do inferno, julgado e preso.`)
          .setImage(rand)
          .setThumbnail(avatar)
          .setTimestamp()
          .addField("***Motivo: PORQUE EU DECIDI QUE SIM.***", "*Inseto imundo...*")
          .setFooter(`Eu sou a lei!`)
    await msg.channel.send(cpreso);
  }


  if (command === "bert") {
    const bert = new Discord.MessageEmbed()
    .setColor("b50102")
    .setDescription(`Toma um pouco de alegria para sua vida miseravel, inseto.`)
    .setImage(file)
    .setFooter("Sua alma é minha e sua divida cresce...")
    msg.channel.send(bert);
  }
  
  if (command === "duvida" || command === "d") {
    const perg = new Discord.MessageEmbed()
    .setColor("b50102")
    .setDescription(replies)
    msg.channel.send(perg);
  }
  
  if (command === "help") {
    const helpembed = new Discord.MessageEmbed()
      .setColor("b50102")
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      .setDescription(
        `
          __***Comandos***__

\`!cplay [titulo/url]\`|\`Colocar música na queue\`|

\`!csearch [titulo]\`|\`Para procurar a música\`|

\`!cskip\`|\`Para pular a música atual\`|

\`!cstop\`|\`Para parar a música atual\`|

\`!cresume\`|\`Para ligar novamente a música\`|

\`!cnowplaying\`|\`Para saber oque está tocando\`|

\`!cqueue\`|\`Para abrir a queue\`|

\`!cbert\`|\`shitpost\`|

\`!cduvida\`|\`Respostas para suas duvidas (SIM/NÃO)\`|

\`!cvolume [num 1-100]\`|\`Para alterar o volume]\``
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
      return msg.channel.send("Não é possível skipar aquilo que não existe, é tipo eu, porem eu claramente existo.");
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
        `**|** **\`${song.title}\`** foi adicionado à queue, inseto!`
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
//process.env.
bot.login(process.env.TOKEN);
