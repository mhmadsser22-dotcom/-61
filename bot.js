const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server ready.');
});

function createBot() {
  const bot = mineflayer.createBot({
  host: 'mhmadsser2.aternos.me',
  port: 12492,
  username: 'AFK_Bot'
});

    username: 'AFK_Bot'
  });

  bot.on('spawn', () => {
    console.log('Bot has joined the Java server successfully!');
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });

  bot.on('end', () => {
    console.log('Connection ended, reconnecting...');
    setTimeout(createBot, 5000);
  });
}

createBot();
