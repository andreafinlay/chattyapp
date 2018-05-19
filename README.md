# Chatty

Chatty is an app that allows multiple users to communicate with each other in real-time. :speech_balloon:

Chatty uses WebSockets to allow connected users to share messages in a common chat room. Users have the option to enter and change their display name. All users see messages as well as notifications when a user updates their name.

This app was built using [React](https://reactjs.org/), [Babel](https://babeljs.io/), and [Sass](https://sass-lang.com/) on the front-end, and [Express](https://expressjs.com/) and [WebSockets](https://github.com/websockets/ws) on the back-end.

## Final Product

Entering the chatroom and sending a message

!["Create message"](https://github.com/aunomy/chattyapp/blob/master/docs/send-message.gif?raw=true)

Updating username

!["Update username"](https://github.com/aunomy/chattyapp/blob/master/docs/change-name.gif?raw=true)

Chatty interface

!["Main interface"](https://github.com/aunomy/chattyapp/blob/master/docs/interface.png?raw=true)

## Getting Started

1. From the root directory, install dependencies (`npm install`).
2. From the `server` directory, install dependencies (`npm install`).
3. From the root directory, start the WebPack server (`npm start`). The app will connect on port 3000.
4. From the `server` directory, start the WebSockets server (`npm start`). The server will connect on port 3001.
5. Visit <http://localhost:3000/> in your browser. Open multiple sessions to communicate between them in real-time.

## React Dependencies

* [babel-core](https://babeljs.io/)
* [babel-loader](https://github.com/babel/babel-loader)
* [css-loader](https://www.npmjs.com/package/css-loader)
* [eslint](https://eslint.org/)
* [node-sass](https://www.npmjs.com/package/node-sass)
* [react](https://reactjs.org/)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [sass-loader](https://www.npmjs.com/package/sass-loader)
* [sockjs-client](https://www.npmjs.com/package/sockjs-client)
* [style-loader](https://www.npmjs.com/package/style-loader)
* [webpack](https://webpack.js.org/)
* [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
* [prop-types](https://www.npmjs.com/package/prop-types)
* [Webpack](https://webpack.js.org/)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [ws](https://github.com/websockets/ws)

## Server Dependencies

* [express](https://expressjs.com/)
* [uuid](https://www.npmjs.com/package/uuid)
* [ws](https://github.com/websockets/ws)
