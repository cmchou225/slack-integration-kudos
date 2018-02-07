const routes = require('express').Router();
const axios = require('axios');

const helpers = require('./helpers');

const slackInfo = {access_token: process.env.token, hookUrl: process.env.hookUrl};

routes.get('/', (req, res) => {
  res.send('Slack test API up and running');
})

routes.post('/thumbsUp', (req, res) => {
  if(req.body.challenge){
    res.send(req.body.challenge);
    return;
  }
  res.send('ok');
  if(req.body.event.reaction === 'thumbsup_all'&& req.body.event.item_user){
    const postNoteToKudos = async() =>{
      try{
        const reactUsername = await helpers.getUserName(slackInfo.access_token, req.body.event.user);
        const postUsername = await helpers.getUserName(slackInfo.access_token, req.body.event.item_user);
        axios({
          url: slackInfo.hookUrl,
          method: 'POST',
          headers: {'content-type':'application/json'},
          data: {text: `${reactUsername} gave kudos to ${postUsername}`}
        }).catch(err => {console.log(err)});
      } catch(e){
        console.log(e);
      }
    }
    postNoteToKudos();
  }
})

// Install app via button using Oath for slack app administrators
routes.get('/oath', (req, res) => {
  if(!req.query.code) {
    res.status(500);
    res.send({"Error": "No code received."});
    console.log("looks like no code");
  } else {
    axios.get('https://slack.com/api/oauth.access',{
      params: {code: req.query.code, client_id: process.env.ID, client_secret: process.env.SECRET}
    }).then(response => {
      if(!response.data.ok) {
        console.log(response.data);
      } else {
        slackInfo.hookUrl = response.data.incoming_webhook.url;
        slackInfo.access_token = response.data.access_token;
        res.redirect('/');
      }
    })
  }
});

routes.get('/auth', (req, res) =>{
  res.sendFile(__dirname + '/add_to_slack.html')
})

module.exports = routes;