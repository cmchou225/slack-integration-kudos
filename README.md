# slack-integration-kudos
Simple API server for slack to post note to #kudos channel when a message receives thumbsup:all reaction.

#### Local machine development:
First download and install ngrok for secure tunnelling between localhost and web accessible endpoint. Tutorial found here: https://api.slack.com/tutorials/tunneling-with-ngrok

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

### Under the Slack hood
- Slack app is subscribed to reactions:added event in the workspace and sends an event object to our API server whenever a reaction is added.
- API server checks to see if the event reaction is a ```thumbsup:all``` reaction. If so, server will make Web API calls to retrieve the names of the reacted user and reacted message poster, and cache the results for future.
- API server then sends a note to #kudos channel using the incoming webhook URL detailing who gave whom kudos!
