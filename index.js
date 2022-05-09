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
  "Creio que é possivel.",
  "Pergunte para outro lacaio, estou muito ocupado gerenciando as almas.",
  "Tão certo quanto a existencia dos precursores do caos... malditas criaturas."
];
const rando_imgs = [
  "https://cdn.discordapp.com/attachments/724446406974373939/729074490796933160/23131696_1695018637204579_5859999086972803689_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074496224493578/23434917_1701901176516325_6316485986460373726_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074574376828989/teste.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074597520998510/72385662_2393715667561656_8990451527986446336_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074609764171826/69290008_2596438523729248_4373050913837809664_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074613715468288/67911517_2587508841288883_357440514246574080_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074615351115796/67458994_2565434860162948_3506769938813550592_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074619038040104/68524407_2580342288672205_7895968473690406912_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074642547114084/67812026_2552631661443268_6935917131254988800_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729074657344618608/67720681_2565435106829590_4209080792032215040_n.png",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096468048380014/13315760_1712210462378850_3643634910999087730_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096470879404095/13344657_1710062745926955_7604883016672988156_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096486507380746/13391562_1714154475517782_3271778363646067958_o.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096487702888518/13450302_1716231231976773_4829836222410150227_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096490512941146/13450996_1714595395473690_7978961667920104042_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096492601835520/13510913_1722621274671102_7007340040688927737_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096495667871784/13516568_1718428981756998_3116126122603531932_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096503716478987/13532856_1721843768082186_5074149121764380472_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096509936894012/13599848_1723859164547313_116062775635348135_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096517843025991/14484606_1761338934132669_9051190072309593052_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096524209979443/14520610_1760147724251790_9006308411635891307_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096530346115143/14523119_1764293197170576_4455861861331428656_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096541016555590/14568250_1761338880799341_1496434670809915868_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096554602037278/14570362_1761339097465986_7200406969430057138_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096570682998867/14572854_1764292943837268_2965013308709424137_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096597539127366/14590393_1764293387170557_3561464249809953062_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096627540983868/14591667_1764472673819295_2911870003027661178_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096656959701050/14600902_1761338057466090_7584307949860951008_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096677218058280/14611020_1763749170558312_8886440074404971658_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096706876244058/15032920_1783452505254645_4173253044556901179_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096723619905546/15036403_1783453591921203_6508037329234068769_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096738211627219/15036740_1783452671921295_5489933427609549222_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096745199599616/15078717_1783452291921333_6914634325155571242_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096753806180382/15095045_1783453481921214_5647793390882309526_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096826707509308/13315737_1710878909178672_5664718020719734774_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096822932373564/13312725_1709756879290875_4611468370363896916_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096820793540669/13307429_1710130442586852_7232509596220303999_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096817228382348/13267872_1710450435888186_2775584785895649984_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096806071533699/40873993_2129408243992401_1581390070575792128_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096798857199647/24129759_1949607308639163_2588582390275358899_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096791894786048/15181275_1783452201921342_8119274868304792750_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096777046687896/15178234_1783452125254683_8502696458289740115_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096771095232572/15109583_1783452951921267_8860210495952219596_n.jpg",
  "https://cdn.discordapp.com/attachments/724446406974373939/729096764740730930/15107200_1783452838587945_556898721497266397_n.jpg",
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

const chefi = ["https://cdn.discordapp.com/attachments/702336455992672366/735922661422661642/chefe31.png"
];
const conj = ["https://cdn.discordapp.com/attachments/712225657924616272/729563154467782756/vitoria-maxwell-mariana-magic-circle-animation-export.gif"
];
const nelsi = ["https://cdn.discordapp.com/attachments/712225657924616272/729560699956756490/nelsinho.png"
];
const esq = ["https://cdn.discordapp.com/attachments/712225657924616272/729566699535335444/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif"
];
const elmo = ["https://cdn.discordapp.com/attachments/746470181420925069/746491002688110692/0a2b604d3230ea898f1ac05f6dca0845277224b2_hq.gif"
];
const pare = ["https://cdn.discordapp.com/attachments/719317270836412489/730149838477590568/MetallicThriftyIcelandgull-small.gif"
];

const PREFIX = "!";
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
  const chef = chefi[Math.floor(Math.random() * chefi.length)];
  const nels = nelsi[Math.floor(Math.random() * nelsi.length)];
  const conjuration = conj[Math.floor(Math.random() * conj.length)];
  const esqu = esq[Math.floor(Math.random() * esq.length)];
  const elm = elmo[Math.floor(Math.random() * elmo.length)];
  const parede = pare[Math.floor(Math.random() * pare.length)];

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);

  if(command === "d20"){
    //valor20 = math.floor(math.random() * 20 + 1)
    const dado20 = new Discord.MessageEmbed()
      .setTitle(`Resultado do DADO:`)
      .setColor("#4d8cc2")
      .setDescription(`valor20`)
      .setFooter("Valor de um dado de 20 lados");
      msg.channel.send(dado20);
  }

  if (command === "d") {
    msg.delete();
    const content = args.splice(1).join(" ");
    
    if (!args[0]) {
      return msg.channel.send(` Se vai usar o poder de fala use para algo.`)
    } else if (content.length > 1000) {
      return msg.channel.send(`forneça uma mensagem de no máximo 1000 caracteres.`);
    } else {
      //valorDado = math.floor(math.random() * [int,content])
      const dado20 = new Discord.MessageEmbed()
      .setColor("#4d8cc2")
      .setDescription(`valorDado`)
      .setFooter("Valor de um dado de 20 lados")
      .setTimestamp();
      msg.channel.send(dado20);
    }
  }

  if (command === "aviso") {
    msg.delete();
    const content = args.splice(2).join(" ");
    
    if (!args[0]) {
      return msg.channel.send(` Se vai usar o poder de fala use para algo.`)
    } else if (content.length > 1000) {
      return msg.channel.send(`forneça uma mensagem de no máximo 1000 caracteres.`);
    } else {
      var canal = msg.guild.channels.cache.find(ch => ch.id === "746430938032111726");
      const msg46 = await canal.send(
        new Discord.MessageEmbed()
        .setColor("b50102")
        .setTitle("Insetos, venho por meio desta informar...")
        .setDescription(content)
        //.addField("Autor:", message.author)
        //.addField(content)
        //.setFooter("ID do Autor: " + message.author.id)
        .setTimestamp()
      );
      await msg.channel.send(`a mensagem foi enviada, inseto!`);
    
      const emojis = ["🔥"];
    
      for (const i in emojis) {
        await msg.react(emojis[i])
      }
    }
  }

  if (command === "pris" || command === "prisão") {
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

  if (command === "duvida" || command === "d" || command ==="dúvida") {
    const perg = new Discord.MessageEmbed()
    .setColor("b50102")
    .setDescription(replies)
    await msg.channel.send(perg);
  }

  if (command === "config") {
    const config = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("Afim de ouvir algum lix.. Digo, musica humano? Podes usar estes comandos aqui pra isso.")
    .setDescription(`
    ***Comandos do Nelson***
    *!resume  :: Despausa a música*
    *!pause     :: Pausa a música*
    *!loop        :: Repete a música atual.*
    *!play         :: Inicia uma música para tocar.*
    *!queue        :: Abre a queue.*
    *!skip         :: Pula a música atual.*
    *!remove     :: Remove uma música da queue.*
    *!stop     : Para a música que você esta ouvindo.*
    
    ***Comandos do Chefinho***
    *!cresume  :: Despausa a música*
    *!cpause     :: Pausa a música*
    *!cloop        :: Repete a música atual.*
    *!cplay         :: Inicia uma música para tocar.*
    *!cqueue        :: Abre a queue.*
    *!cskip         :: Pula a música atual.*
    *!cremove     :: Remove uma música da queue.*
    *!cstop     : Para a música que você esta ouvindo.*`)
    .setThumbnail(esqu)
    msg.channel.send(config);
  }

  if (command === "config2") {
    const config2 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("Temos esses diferenciados tambem.")
    .setDescription(`
    ***Primatas***
    *!monkey    :: Fotos de macacos.*
    ***Shitposting***
    *!cbert    :: Shitposte.*
    ***Respostas divinas para suas duvidas***
    *!cduvida    :: Respostas (SIM/NÃO) para suas duvidas.*
    
    "A mas você quer saber o valor da sua alm.. Digo, seu nivel?"

    ***Comandos de Level***
    *!rank    :: Mostra seu "nivel"*                      
    *!levels   :: Mostra o rank dos membros no servidor*`)
    .setThumbnail(elmo)
    msg.channel.send(config2);
  }
  
  if (command === "config15") {
    const config15 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("O mercado de almas está aberto e aqui você pode ver como usa-lo.")
    .setDescription(`
    ***Como acessar o mercado***
    *!store <page>    ::  Abre a loja.*
    *!buy-item <quantidade> <item>    ::  Compra uma quantidade de itens.*
    *!item-info <nome do item>    :: Vê informações do item.*
    *!sell-item <nome do comprador> <quantidade> <nome do item>    :: vende o item pra um membro.*
    *!inventory <page>    :: Abre o inventorio.*
    *!use-item <quantity> <item name>    :: Usa um item do seu inventorio.*

    ***Formas de conseguir almas***
    *!work    :: Você trabalhara para mim e em troca lhe darei algumas almas.*
    *!slut    :: Você irá vender seu corpo em troca de almas.*
    *!crime    :: Você irá cometer um crime em nome do Deus jabiroca e será recompensado.*
    *!rob     :: Você tentara roubar um outro membro.*

    "Tambem temos os jogos do cassino do boss..."

    ***Comando do cassino***
    *!blackjack <valor aposta>    :: Jogará um blackjack (21)*                      
    *!russian-roulette <valor aposta>    :: Jogo de 2 até 6 jogadores.*
    *!slot-machine <valor aposta>    :: Jogo Caça-níquei.*  
    *!cock-fight <valor aposta>   :: Você colocará seu galo na rinha para lutar até a morte. (É preciso um galo comprado para esse jogo)*
    
    ***Como interagir com o seu dinheiro***
    *!money    :: Abre sua carteira e mostra tambem o quanto você tem no banco.*
    *!deposit <valor>    :: Você deposita uma quantidade de cash no banco.*
    *!withdraw <valor>    :: Você faz um saque no dinheiro que você tem no banco.*`)
    .setThumbnail(elm)
    msg.channel.send(config15);
  }

  if (command === "config3") {
    const config3 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setThumbnail(conjuration)
    .setTitle("Quer convocar mais um seguidor? Bem, use essa escrita mitíca.")
    .setDescription("https://discord.gg/kYVGXmb")
    msg.channel.send(config3);
  }

  if (command === "config4") {
    const config4 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("Ah queres chamar o Nelson? Aquele inutil? Ok... use está outra escritura e ele irá onde quer que seja.")
    .setDescription("https://discordapp.com/oauth2/authorize?client_id=712448276703608864&scope=bot&permissions=8")
    .setThumbnail(nels)
    .setFooter("Cada ideia que esses insetos tem... chamar o Nelson? Que otarios MUAHAHAAH.")
    msg.channel.send(config4);
  }

  if (command === "config5") {
    const config5 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("Hmmm desejas ME chamar? Bem vai lhe custar caro, use está outra escritura e talvez EU apareça.")
    .setDescription("https://discordapp.com/oauth2/authorize?client_id=712513258279403621&scope=bot&permissions=8")
    .setThumbnail(chef)
    .setFooter("Sua alma ja é minha mesmo, não se preocupe inseto.")
    msg.channel.send(config5);
  }
  if (command === "config6") {
    const config6 = new Discord.MessageEmbed()
    .setColor("b50102")
    .setTitle("A todos os inset... Digo, homens de cultura que possuem a chave do conhecimento, Trago o caminho:")
    .setDescription(`
    ***Busca*** 
    *>>nhSearch <tag>  :: Busca nhentai pela tag*
    *>>pixiv <tag>  :: Busca no pixiv pela tag*
    *>>reddit  :: hentais do subreddit*
    *>>r34 <tags>   :: Procura no Rule34 pela tag*
    *>>e621 <tags>   :: Busca no e621 pela tag*
    *>>danbooru <tag>   :: Procura no Danbooru pela tag*
    *>>gelbooru <tags>   :: Busca no Gelbooru pela tag*
    *>>derpi <tags>  :: Busca no Derpi pela tag*
    
    ***Videos ***
    *>>hAtags <tags>  :: Procura no hanime.tv por hentais*
    
    ***Especifico***
    *>>pussy :: Fotos buceta de hentai*
    *>>boobs  :: Fotos de tetas de hentai*
    *>>femdom  :: Fotos BDS de hentai*
    *>>lewd  :: Fotos neko de hentai*
    *>>yuri  :: Fotos lesb de hentai*
    *>>waifu  :: Gera uma waifu*
    *>>hentai  :: Gera um hentai*
    *>>hentaibomb  :: Gera 5 fotos de hentai*
    *>>yandere  :: Gera hentai yandere*
    
    *** 3D ***
    *bbboobs :: Gera fotos de peitos*
    *bbass  :: Gera fotos de bundas*
    *bbgif  :: Random Gifs*
    *bbpussy  :: Gera foto de xotas*
    *bbcumsluts  :: Gera fotos de gozadas.*
    *bbreal  :: Gera waifus 3D*
    *bbrandom  :: Gera qualquer comando da lista 3D*
    
    ***3D Temáticos***
    *bbvday  :: Gera fotos do dia dos namorados*
    *bbeaster  :: Gera fotos com tema da Páscoa*
    *bbxmas  :: Gera fotos de Natal*
    *bbhalloween  :: Gera fotos do dia das bruxas*`)
    .setThumbnail(parede)
    .setFooter("Estude sempre que puder.")
  msg.channel.send(config6);
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
