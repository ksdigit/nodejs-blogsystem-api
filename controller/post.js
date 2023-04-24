const Validator   = require("fastest-validator");
const models      = require("../models");

function save(req, res) {
    // Récupération des données saisies par le user
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId,
    };
    // Définition du schéma de validation
    const schema = {
        title: {
            type: "string",
            optional: false,
            max: "100",
        },
        content: {
            type: "string",
            optional: false,
            max: "500",
        },
        categoryId: {
            type: "number",
            optional: false,
        },
    };
    // Variables de validation
    const validation = new Validator();
    const validationResponse = validation.validate(post, schema);
    // Condition de validation
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }
    // Vérification de l'existence de la validation
    models.Category.findByPk(req.body.category_id)
        .then((result) => {
            if (result !== null) {
                // Création du post
                models.Post.create(post)
                    .then((result) => {
                        res.status(201).json({
                            message: "Post created successfully",
                            post: result,
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error.message,
                        });
                    });
            } else {
                res.status(400).json({
                    message: "Invalid category ID",
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

function show(req, res) {
    // Récupération de l'identification du post
    const postId = req.params.id;
    /* Vérification de l'existence de l'identifiant dans la base de données
     ** Si l'identifiant existe, on affiche le post sous format json.
     ** S'il n'existe pas, on affiche le status 404 (not found) */
    models.Post.findByPk(postId)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Post not found!",
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

function index(req, res) {
    models.Post.findAll()
        .then((result) => {
            if (result.length !== 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "No post available!",
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

function update(req, res) {
    const postId = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    };

    const userId = req.body.userId;

    const schema = {
        title: {
            type: "string",
            optional: false,
            max: "100",
        },
        content: {
            type: "string",
            optional: false,
            max: "500",
        },
        categoryId: {
            type: "number",
            optional: false,
        },
    };

    const validation = new Validator();
    const validationResponse = validation.validate(updatedPost, schema);

    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation failed",
            errors: validationResponse,
        });
    }

    models.Category.findByPk(req.body.category_id)
        .then((result) => {
            if (result !== null) {
                models.Post.update(updatedPost, {
                    where: { id: postId, userId: userId },
                })
                    .then((result) => {
                        res.status(200).json({
                            message: "Post updated successfully",
                            post: updatedPost,
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error.message,
                        });
                    });
            } else {
                res.status(400).json({
                    message: "Invalid category ID",
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

function destroy(req, res) {
    const postId = req.params.id;
    const userId = req.body.userId;

    models.Post.destroy({ where: { id: postId, userId: userId } })
        .then((result) => {
            res.status(200).json({
                message: "Post deleted successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error.message,
            });
        });
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
};
