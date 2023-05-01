const posts = require("../controllers/post.controllers");
const auth = require("../lib/middleware")
module.exports = function(app){
    app.route("/posts")
        .get(posts.getAll)
        .post(auth.isAuthenticated, posts.create);
}