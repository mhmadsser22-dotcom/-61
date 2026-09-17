const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const minecraftData = require('minecraft-data');
const express = require('express');

// سيرفر ويب مصغر لإبقاء ريلواي نشطاً ومستقراً 24/7
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Ultimate Smart Bot is running smoothly 24/7!');
});

app.listen(PORT, () => {
  console.log(`Web server ready on port ${PORT}`);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'bendneeds.minefort.com',
    port: 25565,
    username: 'SmartPlayerBot',
    version: '1.21.4' // الإصدار الدقيق لسيرفر Spigot الجديد
  });

  // تفعيل نظام الحركة والذكاء (Pathfinder)
  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log('تم اتصال البوت الذكي بنجاح ودخل سيرفر Spigot 1.21.4!');

    const mcData = minecraftData(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);

    // تفعيل السلوكيات البشرية العشوائية لمنع الطرد بسبب الكسل (AFK Kick)
    startSmartBehaviors(bot);
  });

  // تفاعل ذكي عند الهمسات أو التحدث في الشات
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[شات السيرفر] ${username}: ${message}`);
    
    // إذا شخص نادى البوت، يمكنه الرد بلطف
    if (message.toLowerCase().includes('bot') || message.toLowerCase().includes('بوت')) {
      bot.chat(`أهلاً بك يا ${username}! أنا أعمل هنا بشكل دائم.`);
    }
  });

  // إدارة إعادة الاتصال بذكاء عند أي انقطاع
  bot.on('end', (reason) => {
    console.log(`انقطع الاتصال بسبب: ${reason}. جاري إعادة المحاولة خلال 6 ثوانٍ...`);
    setTimeout(createBot, 6000);
  });

  bot.on('error', (err) => {
    console.log('خطأ غير متوقع في البوت:', err);
  });
}

// دالة التصرفات الذكية التي تحاكي اللاعب البشري
function startSmartBehaviors(bot) {
  // حركة عشوائية وتلفت بالعين كل 30 ثانية
  setInterval(() => {
    if (!bot.entity) return;

    // 1. تلفت في المكان وكأن اللاعب يلتفت ليرى محيطه
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * (Math.PI / 3);
    bot.look(yaw, pitch, true);

    // 2. حركة خفيفة عشوائية (خطوة للأمام أو قفزة صغيرة)
    const actions = ['jump', 'forward', 'sneak'];
    const chosenAction = actions[Math.floor(Math.random() * actions.length)];

    if (chosenAction === 'jump') {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 400);
    } else if (chosenAction === 'forward') {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
    } else if (chosenAction === 'sneak') {
      bot.setControlState('sneak', true);
      setTimeout(() => bot.setControlState('sneak', false), 1500);
    }

    console.log('البوت يقوم بحركة تفاعلية ذكية لمنع الـ AFK...');
  }, 30000); // كل 30 ثانية
}

createBot();
