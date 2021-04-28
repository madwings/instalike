# LimeChain Instagram like Service - Proof of Concept

POC is written in JavaScript with the help of Node.js 12x.

Here you will ask why in JavaScript as everywhere in the design I recommend using its superset - TypeScript.
The answer is simple. First, JavaScript needs less tooling which makes it perfect for the POC. Second, I have got more samples
to work with in JavaScript and I use it more on a daily basis than TypeScript right now.

There are two ways to integrate the real time updating.
- Long polling with AJAX. This is the approach I have chosen to integrate. The main reason is that it requires less resources to operate.
For such a service resource utilization is very important as costs may skyrocket.
- WebSocket API. It is very good for a chat service in the context of the task. But for live update it may become too costly as resource utilization is higher.
Sooner or later you will have to deal with this - https://medium.com/swlh/building-a-browser-push-notification-service-the-challenges-with-the-websocket-server-8cf9b1827e24
These days real time update is almost abandoned in the Social Networks. They show a message that you have new posts and a user action is required to refresh.
It could also be disabled after a period of time if it exists at all, as user may have left his tab open which may result in heavy loads, etc...

I have used the Blockchain Data API - https://www.blockchain.com/api/blockchain_api as source of data for the real time update.
Yes it is not a feed of images but it works fine to show the concept.

For the test first start the Back-End then the Front-End

## Front-End

Located inside ./frontend folder. Very simple React app, bootstrapped with [Create React App]\

Install the dependencies with:

`yarn install`

Start with:

`yarn start`

## Back-End (API)

Located inside ./api folder. Based on `Express.js`

Install the dependencies with:

`yarn install`

Start preferably with:

`yarn start:dev`

Tests can be started with:

`yarn:test` or `yarn test:quick` with or without coverage
