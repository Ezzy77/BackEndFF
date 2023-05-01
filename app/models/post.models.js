const db = require("../../database");

const getAllPosts = (done) => {
  const results = [];

  db.each(
    "SELECT * FROM posts",
    [],
    (err, row) => {
      if (err) console.log("Something went wrong: " + err);

      results.push({
        post_id: row.post_id,
        author: row.author,
        post_text: row.post_text,
        date_published: new Date(row.date_published).toLocaleDateString(),
        created_by: row.id,
      });
    },
    (err, num_rows) => {
      return done(err, num_rows, results);
    }
  );
};

const addNewPost = (post, done) => {
  let date = Date.now();
  const sql = `INSERT INTO posts (  author,post_text, date_published) VALUES (?,?,?)`;
  let values = [post.author, post.post_text, date];

  db.run(sql, values, function (err) {
    if (err) return done(err, null);

    return done(null, this.lastID);
  });
};

// const getSingleArticle = (id, done) => {
//     const sql = `SELECT * FROM articles WHERE article_id=?`

//     db.get(sql, [id], (err, row) => {
//         if(err) return done(err)
//         if(!row) return done(404)

//         return done(null, {
//             article_id: row.article_id,
//             title: row.title,
//             author: row.author,
//             date_published: new Date(row.date_published).toLocaleDateString(),
//             date_edited: new Date(row.date_edited).toLocaleDateString(),
//             article_text: row.article_text
//         })
//     })
// }

// const updateArticle = (id, article, done) => {
//     const sql = 'UPDATE articles SET title=?, author=?,article_text=? WHERE article_id=?'
//     let values = [article.title, article.author, article.article_text, id];

//     db.run(sql, values, (err) => {
//         return done(err)
//     })
// }

// const OnedeleteArticle = (id, done) => {
//     const sql = 'DELETE FROM articles WHERE article_id=?'

//     db.get(sql, [id], (err) => {
//         if(err) return done(err)
//         return done(false)
//     })
// }

module.exports = {
  getAllPosts: getAllPosts,
  // getSingleArticle: getSingleArticle,
  // updateArticle: updateArticle,
  // OnedeleteArticle: OnedeleteArticle,
  addNewPost: addNewPost,
};
