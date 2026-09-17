const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running 24/7!');
});

app.listen(3000, () => {
  console.log('Web server ready.');
});

const client = bedrock.createClient({
  host: 'mhmadsser2.aternos.me',
  port: 12492,
  username: 'AFK_Bot',
  offline: true,
  version: '1.26.50.5'
});

client.on('join', () => {
  console.log('Bot has joined the Aternos server successfully!');
});

client.on('error', (err) => {
  console.log('Error:', err);
});

client.on('close', () => {
  console.log('Connection closed.');
});
