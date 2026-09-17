const mineflayer = require('mineflayer');
const express = require('express');

// إعداد سيرفر ويب بسيط لكي تستقر ريلواي (Railway Health Check)
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Bot is running 24/7!');
});

app.listen(PORT, () => {
  console.log(`Web server ready on port ${PORT}`);
});

// دالة تشغيل البوت وربطه بسيرفر ماينكرافت
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Keepcourse.minefort.com',
    port: 25565,
    username: 'AFK_Bot',
    version: '26.1.2' // تم تحديد الإصدار يدوياً لتجنب مشاكل البروتوكول
  });

  bot.on('spawn', () => {
    console.log('تم اتصال البوت بنجاح ودخل السيرفر!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
  });

  // إعادة الاتصال تلقائياً إذا انقطع أو أُغلق السيرفر مؤقتاً
  bot.on('end', (reason) => {
    console.log(`انقطع اتصال البوت بسبب: ${reason}. جاري إعادة المحاولة خلال 5 ثوانٍ...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('حدث خطأ في البوت:', err);
  });
}

createBot();
