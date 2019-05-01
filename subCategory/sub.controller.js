const subModel= require("./sub.model");
const _ = require("underscore");


exports.createSubCategory=(req,res,next)=>{
    let subCat= req.body;
    _.extend(subCat,(req.params._id));
    console.log("sub cat", subCat)
    let sub = new subModel(req.body);
    sub.save((err,saveSubCate)=>{
      if (err){
          return res.status(500).json({
              status:false,
              message:"err while createing sub category",
              data: err
          })
      }   else {
          return res.status(200).json({
              status:true,
              message:"sub category saved  sucessfuly",
              data: saveSubCate
          })
      }
    })
};

exports.updateSubCategory=(req,res,next)=>{
  let updateSub= req.body;
  _.extend(updateSub);
    subModel.findById({id:req.id},(err,update)=>{
        if (err){
            return res.status(500).json({
                status:false,
                message:"error ",
                data:err
            })
        }else {
            return res.status(200).json({
                status:true,
                message:"sucess sub cat created",
                data:update
            })
        }
    });
    next();
};

exports.getAllSubCat=(req,res,next)=>{
  subModel.find()
      .then(subCat=>{
         if (subCat){
             return res.status(200).json({
                 status:true,
                 message:"this is the list of the sub category",
                 data:subCat
             })
         }else{
             return res.stat(500).json({
                 status:false,
                 message:"unable to get list of all sub Category"
             })
         }
      });



    next();
};
exports.deleteAllSubCat=(req,res,next)=>{
   subModel.findByIdAndRemove(req.params.id)
       .then(remove=>{
           if(!remove){
               return res.status(500).json({
                   status:true,
                   message:"unable to delete sub category please try again "
               })
           }else {
               return res.status(200).json({
                   status:true,
                   message:"sub category deleted sucessfuly",
                   data:remove
               })
           }
       })
};
