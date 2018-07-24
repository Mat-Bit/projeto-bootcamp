const TeleBot = require('telebot');
const bot = new TeleBot('677533469:AAHiQzexNX2SUcQzppc1Tgh1KLxVvQKUz_4');

// On every text message
bot.on('text', msg => {
    let id = msg.from.id;
    let text = msg.text;
    return bot.sendMessage(id, `You said: ${ text }`);
});

bot.on('/hello', (msg) => {
  return bot.sendMessage(msg.from.id, `Hello, ${ msg.from.first_name }!`);
});

bot.connect();
