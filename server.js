const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

// Replace the value below with the Telegram token you receive from @BotFather
const token = '6394151990:AAGQFLNZ7u3z9BStOVdMGoPeoeFtU4--fY0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let randomNumber = 0;
// Matches "/echo [whatever]"
bot.onText(/\/newemail/, (msg, match) => {
    // Move the 'num' variable outside the function
    let num = 0;
    randomNumber++;
    
    const getmessagelist = async () => {
        let email = `nichacks${randomNumber}@mailto.plus`;
        let chatId = msg.chat.id;
        bot.sendMessage(chatId, "YOUR EMAIL -> " + email);
        

        intervalID = setInterval(async () => {
            let res = await axios.get(`https://tempmail.plus/api/mails?email=${email}`);
            if (res.data.count > num) {
                for (let int = 0; int < 1; int++) {
                    bot.sendMessage(chatId, "MESSAGE RECEIVED: -> " + res.data.mail_list[int].subject);
                }
                num = num + 1;
            }
        },200);

    }
    getmessagelist();
   
    // Send back the matched "whatever" to the chat
});

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
    // Send a message to the chat acknowledging receipt of their message
});
