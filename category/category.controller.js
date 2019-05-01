const Category = require("./category.model");
const _ = require("underscore");

exports.createCategory = (req, res, next) => {
    let createCreq = req.body;
    _.extend(createCreq);
    let create = new Category(createCreq);
    create.save()
        .then(saveCategory => {
            if (saveCategory) {
                return res.status(200).json({
                    status: true,
                    message: "category created successfully",
                    data: saveCategory
                })
            } else {
                console.log("djkjdn")
            }
        });

};


exports.updateCategory = (req, res, next) => {
    let updateCategory = req.body;
    Category.findOne({_id: req.params.id}, (err, update) => {
        if (err) {
            console.log("errror", err);
            return res.status(500).json({
                status: false,
                message: "unable to update category",
                data: err

            })
        }
        _.assign(update, updateCategory);
        update.save((err, updateCategory) => {
            if (err) {
                return res.json({
                    status: false,
                    message: 'Unable to update profile',
                    code: 500
                })
            }
            if (updateCategory) {
                return res.status(200).json({
                    status: false,
                    message: 'category sucessfuly updated',
                    code: 200,
                    data: updateCategory
                });
            }
        })


    })


};

exports.getAllCategory = (req, res, next) => {
    Category.find()
        .populate("subcategory")
        .then(user => {
            if (user) {
                return res.status(200).json({
                    status: true,
                    message: "list of all category",
                    data: user
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "unable to find all category"
                })
            }
        }).catch(err => {
        return res.status(500).json({
            status: "false",
            message: "hoops an errror occur",
            data: err
        })
    })
};

exports.delteCategory = (req, res, next) => {
    Category.findByIdAndDelete({_id: req.params.id})
        .then(remove => {
            if (!remove) {
                return res.status(500).json({
                    status: false,
                    message: "invalid id ",
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: "category deleted sucessfully",
                    data: remove
                })
            }
        });

};






