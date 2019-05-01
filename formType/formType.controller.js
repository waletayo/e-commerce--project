const formModel =require("./formType.model");
const _ =require ("underscore");



exports.createformType=(req, res,next)=>{
    let formType =req.body;
    _.extend(formType);
    let form= new formModel(formType);
    form.save()
        .then(form=>{
            if (form){
                return res.status(200).json({
                    status:true,
                    message:"form type created sucessfuly",
                    data: form
                })
            } else{
                return res.status(500).json({
                    status:false,
                    message:"unable to delete form type ",
                })
            }
        })
};
exports.updateFormType=(req,res,next)=>{
    let updateFrom= req.body;
    _.extend(updateFrom);
    formModel.findById(req.params.id,err,update=>{
        if (err){
            return res.status(400).json({
                status:false,
                message:"unable to update form type",

            })

        }if (update){
            return res.status(200).json({
                status:true,
                message:"formtype have bin updated",
                data:update
            })
        }
    });
    next()
};

exports.getAllFormTYpe=(req,res,next)=>{
  formModel.find()
      .then(form=>{
          if (form){
              return res.status(200).json({
                  status:true,
                  message:"list of all form type",
                  data:form
              })
          }else {
              return res.json({
                  status:false,
                  message:"unable to get from type"
              })
          }
      }).catch(err=>{
          console.log("errror", err);
      return res.json({
          status:false,
          message:"catch error ",
          data:err
      })
  });
    next();
};



exports.deleteFormType=(req,res,next)=>{
    formModel.findByIdAndRemove(req.params.id)
        .then(remove=>{
            if (!remove) {
                return res.status(400).json({
                    status:false,
                    message:"invalid id",

                })
            }if (remove){
                return res.json({
                    status:false,
                    code:400,
                    message:"remove form type sucessful",
                    data:remove
                })
            }
        });
    next();
};
