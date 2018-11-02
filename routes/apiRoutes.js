require('dotenv').config({path: './process.env'});



module.exports = function (app) {

    // GET route for API key
    app.get('/getkey', function (req, res) {
        res.send(process.env.KEY);
    })
};