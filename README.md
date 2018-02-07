# slack-integration-kudos
Simple API server for slack to post note to #kudos channel when a message receives thumbsup:all reaction.

#### Local machine development:
First download and install ngrok for secure tunnelling between localhost and web accessible endpoint. 

Tutorial found here: https://api.slack.com/tutorials/tunneling-with-ngrok

### Usage
- Create a new app on slack for your workspace with incoming webhooks and Events API enabled: https://api.slack.com/apps?new_app=1

- Create a new .env file in root directory of cloned repo. Follow the format of example.env file using the corresponding ids, token, secret and incoming webhook url provided by Slack app. 

- Install dependencies then start server

```
ngrok http 4390
node server.js
```
- Create #kudos channel in Slack workspace where Slack app is integrated

- React to any message in any channel with thumbsup:all reaction and a note will post in #kudos channel showing who gave kudos.
