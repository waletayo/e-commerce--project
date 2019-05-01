const Product = require("./product.model");
const _ = require("underscore");


exports.postProduct = (req, res, next) => {

    let productreq = req.body;
    _.extend(productreq, {user: req.user.id});
    let product = new Product(productreq);
    product.save()
        .then(saveProduct => {
            if (saveProduct) {
                console.log("result", saveProduct);
                res.status(201).json({
                    status: false,
                    message: "product updated successfuly",
                    data: saveProduct
                })
            }
        }).catch(err => {
        console.log("err", err);
    });
};

exports.getallProducts = (req, res, next) => {
    Product.find()
        .populate("category")
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: "list of product not found ",
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: "list of all product found:",
                    data: user
                })
            }
        })
};

exports.updateProduct = (req, res, next) => {
    let productfield = req.body;
    _.extend(productfield, req.params._id);
    console.log("user id", req.user.id);
    console.log("profile updated", productfield);
    Product.findOne({user: productfield.user}, (err, product) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Unable to find profile',
                code: 500
            });
        }

        _.assign(product, productfield);
        product.save((err, updatedProduct) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: 'Unable to update profile' +
                        '',
                    code: 500
                });
            }

            if (updatedProduct) {
                return res.status(200).json({
                    status: false,
                    message: 'product sucessfuly updated',
                    code: 200,
                    data: updatedProduct
                });
            }
        })
    })

};


exports.deleteAllSubCat = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id)
        .then(remove => {
            if (!remove) {
                return res.status(500).json({
                    status: true,
                    message: "unable to delete sub category please try again "
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: "sub category deleted sucessfuly",
                    data: remove
                })
            }
        })
};


exports.comment_on_product = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                user: req.user.id
            };
            product.comment.unshift(newComment);
            product.save().then(comment => {
                return res.status(201).json({
                    status:true,
                    message:"comment succ",
                    data: comment
                })
            })
                .catch(err => {
                    res.status(400).json({
                        status:false,
                        message:"cant create coment",
                        error:err
                    })
                });


        })

};
