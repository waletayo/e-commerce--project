const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");
const register = require('./register/register-router');
const login = require("./login/login-router");
const profile = require('./profile/profile-router');
const product = require("./product/product.router");
const media = require("./profile-media/media.router");
const ProductImage = require("./productImage/productImage.router");
const category = require("./category/category.router");
const sub = require("./subCategory/sub.router");
const expressGraphQL = require("express-graphql");
const formType = require("./formType/formType.router");
const cors= require("cors");
const userModel =require("./register/register-model");
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const DB = require("./config/database").mongoURI;
mongoose
    .connect(DB, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("mongoose:", "connection to DataBase sucessfull");
    })
    .catch(err => console.log(err));
app.use(passport.initialize());
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
require("./config/passport")(passport);


app.get("/test", (req, res) => {
    res.json({msg: "user works "});
});
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});
app.use('/api/reg', register);
app.use('/api/login', login);
app.use("/api/profile", profile);
app.use("/api/product", product);
app.use("/api/profile/media", media);
app.use("/api/product/image", ProductImage);
app.use("/api/category", category);
app.use("/api/subcat", sub);
app.use("/api/formt", formType);
app.use("/graphql",
    expressGraphQL({
        userModel,
        graphiql: true
    })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`move is  listening on port ${port}`);
});
