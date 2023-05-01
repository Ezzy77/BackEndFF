const posts = require("../models/post.models");
const joi = require("joi");
const getAll = (req, res) => {
  posts.getAllPosts((err, num_rows, results) => {
    if (err) return res.sendStatus(500);

    return res.status(200).send(results);
  });
};

const create = (req, res) => {
  const schema = joi.object({
    author: joi.string().required(),
    post_text: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = Object.assign({}, req.body);

  posts.addNewPost(post, (err, id) => {
    if (err) return res.sendStatus(500);

    return res.status(201).send({ post_id: id });
  });
};

// const getOne = (req, res) =>{
//     let article_id = parseInt(req.params.article_id);

//     articles.getSingleArticle(article_id, (err, result) => {
//         if(err === 404) return res.sendStatus(404)
//         if(err) return res.sendStatus(500)

//         return res.status(200).send(result)
//         })
// }
// const updateArticle = (req, res) => {
//     let article_id= parseInt(req.params.article_id);

//     articles.getSingleArticle(article_id, (err, result) => {
//         if(err === 404) return res.sendStatus(404);
//         if(err) return res.sendStatus(500);

//         const schema = joi.object({
//             "title":joi.string(),
//             "author": joi.string(),
//             "article_text": joi.string()
//         })

//         const { error } = schema.validate(req.body);
//         if(error) return res.status(400).send(error.details[0].message);

//         if(req.body.hasOwnProperty("title")){
//             result.title = req.body.title
//         }
//         if(req.body.hasOwnProperty("author")){
//             result.author = req.body.author
//         }
//         if(req.body.hasOwnProperty("article_text")){
//             result.article_text = req.body.article_text
//         }

//         articles.updateArticle(article_id,result, (err,id) => {
//             if(err){
//                 console.log(err)
//                 return res.sendStatus(500)
//             }
//             return res.sendStatus(200)
//         })
//     })
// }

// const deleteArticle = (req, res) => {
//     let article_id = parseInt(req.params.article_id);
//     articles.getSingleArticle(article_id, (err, result) => {
//         if(err === 404) return res.sendStatus(404);
//         if(err) return res.sendStatus(500);
//     articles.OnedeleteArticle(article_id, (err) => {
//         if(err) return res.sendStatus(500)

//         return res.status(200).send("Deleted")
//         })
//     })
// }

module.exports = {
  getAll: getAll,
  create: create,
  // getOne: getOne,
  // updateArticle: updateArticle,
  // deleteArticle: deleteArticle
};
