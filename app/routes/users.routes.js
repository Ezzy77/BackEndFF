const users = require("../controllers/users.controllers");
const auth = require("../lib/middleware")
module.exports = function(app){
    app.route("/users")
        .post(users.create)
        .get(auth.isAuthenticated, users.getAll)
    app.route("/login")
        .post(users.login)
    app.route("/logout")
        .post(auth.isAuthenticated, users.logout)
}
