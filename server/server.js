const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

const PORT = 3001;

const server = express()
	.use(express.static('public'))
	.listen(PORT, '0.0.0.0', 'localhost', () =>
		console.log(`Listening on ${PORT}`)
	);

const wss = new SocketServer({ server });


wss.on('connection', ws => {
	const colours = ['#0E0B26', '#1763A6', '#25D9C7', '#D1D99A', '#F29B88'];

  function getIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let randomIndex = getIndex(4);
  console.log(randomIndex);

  const colour = colours[randomIndex];
  console.log(colour);

	const colourObj = JSON.stringify({
		type: 'colour',
    colour: colour
	});

  ws.send(colourObj);

	let numberOfUsers = wss.clients.size;
	const userConnect = JSON.stringify({
		type: 'userConnect',
		userCount: numberOfUsers
	});

	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(userConnect);
		}
	});

	ws.on('message', incomingMsg => {
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
	});

	ws.on('close', () => {
		numberOfUsers = wss.clients.size;
		const userDisconnect = JSON.stringify({
			type: 'userDisconnect',
			userCount: numberOfUsers
		});

		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(userDisconnect);
			}
		});
	});
});
