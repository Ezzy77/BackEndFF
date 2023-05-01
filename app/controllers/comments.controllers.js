const comments = require("../models/comments.models")
const articles = require("../models/post.models")
const joi = require("joi")



const getAll = (req, res) => {
    let article_id = parseInt(req.params.article_id);
    articles.getSingleArticle(article_id, (err, result) => {
        if(err === 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
    })
    comments.getAllComments(article_id,(err, num_rows, results) => {
        if(err === 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
        return res.status(200).send(results);
    })
}




const newComment = (req, res) => {
    let article_id = parseInt(req.params.article_id);
    articles.getSingleArticle(article_id, (err, result) => {
        if(err === 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);

        const schema = joi.object({
            "comment_text":joi.string().required()
        })
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        comments.addNewComment(req.body.comment_text,article_id, (err, id) => {
            if(err) return res.sendStatus(500);

            return res.status(201).send({comment_id: id})
        })
    })

}


const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getSingleComment(comment_id, (err, result) => {
        if(err === 404) return res.sendStatus(404);
        if(err) return res.sendStatus(500);
   console.log(result);
        comments.OnedeleteComment(comment_id, (err) => {
            if(err) return res.sendStatus(500)

            return res.status(200).send("Deleted")
        })
    })
}

module.exports = {
    getAll: getAll,
    newComment:newComment,
    deleteComment: deleteComment
}