const Validator = require("fastest-validator");
const models = require("../models");

// Show all comments
function index(req, res) {
    models.Comment.findAll()
        .then((result) => {
            if (result.length !== 0) {
                res.status(200).json({
                    comment: result,
                });
            } else {
                res.status(404).json({
                    message: "No comment available!",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        });
}

// Add a new comment
function save(req, res) {
    // Récupération des données saisies par le user
    const comment = {
        content: req.body.content,
        postId: req.body.post_id,
        userId: req.userData.userId,
    };
    // Schéma de validation
    const schema = {
        content: {
            type: "string",
            optional: false,
            max: "500",
        },
        postId: {
            type: "number",
            optional: false,
        },
    };
    // Variables de validation
    const validation = new Validator();
    const validationResponse = validation.validate(comment, schema);
    // Condition de validation
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }
    // Vérifier si l'identifiant du post existe
    models.Post.findByPk(req.body.post_id)
        .then((result) => {
            if (result !== null) {
                // Ajouter le commentaire
                models.Comment.create(comment)
                    .then((result) => {
                        res.status(201).json({
                            message: "Comment added successfully!",
                            comment: result,
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Something went wrong!",
                            error: error.message,
                        });
                    });
            } else {
                res.status(400).json({
                    message: "Invalid post ID!",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message,
            });
        });
}

// Show a single comment
function show(req, res) {
    // Récupérer l'identifiant du commentaire
    const commentId = req.params.id;

    // Vérifier l'existence de l'identifiant
    models.Comment.findByPk(commentId)
        .then((result) => {
            if (result !== null) {
                res.status(200).json({
                    comment: result,
                });
            } else {
                res.status(400).json({
                    message: "Comment not found!",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong!",
                error: error.message,
            });
        });
}

// Update a comment
function update(req, res) {
    //
}

// Delete a comment
function destroy(req, res) {
    //
}

module.exports = {
    index: index,
    save: save,
    show: show,
    update: update,
    destroy: destroy,
};
