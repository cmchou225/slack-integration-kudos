require('dotenv').config();
const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');  

const PORT = 4390;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
})


