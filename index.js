const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express().use(bodyParser.json());

const token = "EAAQOLVQqc7cBSeVCZCWTaWb3295l6mh1rxuStOYjZAZByqMOcHJ2MQN8HZBL7JcvPrSUndHJ4LvERUxg3nI4sUvgQFSPIrKGrjegydTQBZA4mNDoUBZCVPyXlOCPNGVcLZAiJyab6oRHbyyPeg7NiNi4mYZCzTZBtFf6e2pp4GxTHPzW9JJm2M6Bhd5FTuFVZB3W4Msu385PsHcD4fk1db9jdZAV7ACglpDN1TshAZDZD";
const phoneId = "1311770995353561";
const verifyToken = "storryboss123";

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === verifyToken) res.send(req.query['hub.challenge']);
  else res.sendStatus(403);
});

app.post('/webhook', async (req, res) => {
  let msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if(msg){
    let from = msg.from;
    let reply = `🔍 Detective StorryBoss চালু! তুমি লিখেছো: ${msg.text?.body}\n\n1 - খুনের রহস্য শুরু করো\n2 - চুরির রহস্য`;
    await axios.post(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      messaging_product: "whatsapp", to: from, text: { body: reply }
    }, { headers: { Authorization: `Bearer ${token}` }});
  }
  res.sendStatus(200);
});

app.get('/', (req,res)=>res.send('Bot is running'));
app.listen(10000, ()=>console.log('running'));
