require('dotenv').config();
const express = require('express');
const app = express(); 
const user = require('./controllers/usercontroller');
const house = require('./controllers/housecontroller')
const sequelize = require('./db');



sequelize.sync();

app.use(express.json());
app.use(require('./middleware/header'));

app.use('/api/user', user);
app.use(require('./middleware/validate-session'));
app.use('/house', house)

/*
app.use('/api/test', function(req, res) {
    res.send("This is data from the /api/test endpoint. It's from the server.");
})
*/

app.listen(process.env.PORT, function () {
    console.log("App is listening on port on:", process.env.PORT);
});