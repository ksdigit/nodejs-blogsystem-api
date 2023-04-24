const express = require("express");

const app = express();

// Importation des routes
const postRoute       = require("./routes/post");
const commentRoute    = require("./routes/comment");
const userRoute       = require("./routes/user");
const imageRoute      = require("./routes/image");

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/users", userRoute);
app.use("/images", imageRoute);

module.exports = app;
