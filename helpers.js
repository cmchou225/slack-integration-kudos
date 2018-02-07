const axios = require('axios');
const users = {};

async function fetchUsername(token, userid) {
  return axios.get('https://slack.com/api/users.profile.get',{
      params: {token, user: userid}
    }).then(response => {
      if(!response.data.ok){
        return Promise.reject(response.data.error)
      }
      const username = response.data.profile.display_name ? response.data.profile.display_name : response.data.profile.real_name;
      users[userid] = username;
      return username;
    })   
}

const helpers = {
  getUserName: (token, userid) => {
    if(users[userid]) return users[userid];
    return fetchUsername(token, userid);
  }
}

module.exports = helpers;