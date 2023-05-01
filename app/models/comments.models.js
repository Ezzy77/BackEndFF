const db = require("../../database");
var Filter = require('bad-words'),
filter = new Filter;

const getAllComments = (article_id, done) => {
    const results = [];

    db.each(
        "SELECT * FROM comments WHERE article_id=?",
        [article_id],
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
                comment_id: row.comment_id,
                comment_text: row.comment_text,
                date_published: new Date(row.date_published).toLocaleDateString(),
                article_id: row.article_id,
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

const addNewComment = (comment_text, article_id, done) => {
    let date = Date.now();

    const sql = `INSERT INTO comments (comment_text, date_published, article_id) VALUES (?,?,?)`;
    let values = [filter.clean(comment_text), date, article_id];

    db.run(
        sql,
        values,
        function(err){
            if(err) return done(null, err);

            return done(null, this.lastID);
        }
    )
}

const getSingleComment = (id, done) => {
    const sql = `SELECT * FROM comments WHERE comment_id=?`

    db.get(sql, [id], (err, row) => {
        if(err) return done(err)
        if(!row) return done(404)

        return done(null, {
            comment_id: row.comment_id,
            comment_text: row.comment_text,

        })
    })
}

const OnedeleteComment = (id, done) => {
    const sql = 'DELETE FROM comments WHERE comment_id=?'

    db.get(sql, [id], (err) => {
        return done(err)
    })
}

module.exports = {
    getAllComments: getAllComments,
    addNewComment: addNewComment,
    OnedeleteComment: OnedeleteComment,
    getSingleComment: getSingleComment
}