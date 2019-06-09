var userList = require("../data/friends.js")

function apiRoute(app){
    app.get("/api/userlist", function(req, res) {
        return res.json(userList);
    });
}

module.exports= apiRoute;

