const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (incomingMsg) => {
    const parsedMsg = JSON.parse(incomingMsg);
    const uuid = uuidv4();
    if (parsedMsg.type === 'postMessage') {
      parsedMsg['id'] = uuid;
      parsedMsg.type = 'incomingMessage';
  } else if (parsedMsg.type === 'postNotification') {
      parsedMsg['id'] = uuid;
      parsedMsg.type = 'incomingNotification';
    }
    const returnMsg = JSON.stringify(parsedMsg);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(returnMsg);
      }
    });
  })

  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));
});
