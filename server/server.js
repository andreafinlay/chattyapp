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
	// Assigns new colours to each user on connection
	const colours = ['#0E0B26', '#1763A6', '#25D9C7', '#D1D99A', '#F29B88'];

	function getIndex(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	let randomIndex = getIndex(4);
	const colour = colours[randomIndex];
	const userColour = JSON.stringify({
		type: 'colour',
		colour: colour
	});

	ws.send(userColour);
	// Sends number of active users to be displayed in navbar
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
	// Parses incoming message type, adds UUID and sends back to client
	ws.on('message', incomingMsg => {
		const parsedMsg = JSON.parse(incomingMsg);
		const uuid = uuidv4();
		switch (parsedMsg.type) {
			case 'postMessage':
				parsedMsg['id'] = uuid;
				parsedMsg.type = 'incomingMessage';
				break;
			case 'postNotification':
				parsedMsg['id'] = uuid;
				parsedMsg.type = 'incomingNotification';
				break;
			default:
				throw new Error('Message type not recognized.')
		}

		const returnMsg = JSON.stringify(parsedMsg);
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(returnMsg);
			}
		});
	});

	// Sends number of users on user disconnect
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
