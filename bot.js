const mineflayer = require('mineflayer');
const express = require('express');

// إعداد سيرفر ويب مصغر لضمان استقرار ريلواي (Health Check)
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Bot is running 24/7 on Spigot 1.21.4!');
});

app.listen(PORT, () => {
  console.log(`Web server ready on port ${PORT}`);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Keepcourse.minefort.com',
    port: 25565,
    username: 'AFK_Bot',
    version: '1.21.4' // الإصدار المطابق لسيرفر الحنفية (Spigot)
  });

  bot.on('spawn', () => {
    console.log('تم اتصال البوت بنجاح ودخل سيرفر الحنفية (Spigot) بنجاح!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
  });

  // إعادة الاتصال تلقائياً في حال انقطع الاتصال لأي سبب
  bot.on('end', (reason) => {
    console.log(`انقطع الاتصال بسبب: ${reason}. جاري إعادة المحاولة خلال 5 ثوانٍ...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('خطأ في البوت:', err);
  });
}

createBot();
