const express = require('express');
const mailer = require(`./Node`)
const TelegramBot = require('node-telegram-bot-api');


const token = '';
const bot = new TelegramBot(token, { polling: true });


const app = express();
const port = 3000;

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/Test.html')
})

app.listen(port, function(){
  console.log(`Server running at http://localhost:${port}/test`);
})

app.use(express.json());
app.use(express.static(__dirname));

app.post('/test', function(req, res){
  const {name, specialty, group, scores, test} = req.body // зберігаємо отримані дані
  // формуємо повідомлення для відправки
  const emailText = `
Завдання: ${test}
Ім'я: ${name}
Спеціальність: ${specialty}
Група: ${group}
Оцінка: ${scores}`;
  
  const message = {
    from: 'Test <webkpi21@gmail.com>',
    to: 'webkpi21@gmail.com',
    subject: 'Результати тесту',
    text: emailText
  };
  // відправка повідомлення на gmail не працює, скоріше за все через зміну правил google. При тестуванні за допомогою сервісу 'ethereal' повідомлення відправляється.
  const chatId = '';
  bot.sendMessage(chatId, emailText);
  mailer(message)
});
    
