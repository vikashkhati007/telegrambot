const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '6394151990:AAGQFLNZ7u3z9BStOVdMGoPeoeFtU4--fY0';
const bot = new TelegramBot(token);

// Create an Express app
const app = express();

// Use bodyParser middleware to parse incoming requests
app.use(bodyParser.json());

// Endpoint to receive updates from Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Matches "/newemail"
bot.onText(/\/newemail/, (msg, match) => {
  let randomNumber = Math.floor(Math.random() * 1000) + 1;
  let num = 0;
  let email = `nichacks${randomNumber}@mailto.plus`;
  let chatId = msg.chat.id;
  bot.sendMessage(chatId, "YOUR EMAIL -> " + email);

  const intervalID = setInterval(async () => {
    try {
      let res = await axios.get(`https://tempmail.plus/api/mails?email=${email}`);
      if (res.data.count > num) {
        for (let int = 0; int < 1; int++) {
          bot.sendMessage(chatId, "MESSAGE RECEIVED: -> " + res.data.mail_list[int].subject);
        }
        num = num + 1;
      }
    } catch (error) {
      console.error(error);
    }
  }, 200);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Bot server started on port ${port}`);
});
