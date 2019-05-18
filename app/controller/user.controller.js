const User=require('../models/user.model');


//Creating and saving a New User
exports.create=(req, res)=>{
     //validating a Creating a New User Request
     if(!req.body){
        return res.status(400).send({
            message:"Userr Details are not completed"
        });
    }

    //creating user
    const user=new User({
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        UserEmail:req.body.UserEmail,
        Password:req.body.Password
    });

   return user.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some Errors found while saving the data in the databas"
        });
    });


};

//Selecting and Viewing all users
    exports.selectAll=(req, res)=>{
        User.find()
        .then(user=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "data cant find due to some errors"

            });
        });
    

};

//Updating any user
exports.update=(req, res)=>{
     //validating for updating User
     if(!req.body.UserId){
        return res.status(400).send({
            message:"Userr Details are not completed"
        });
    }

    User.findOneAndUpdate(req.param.UserId,{
        UserName:req.body.UserName,
        UserEmail:req.body.UserEmail,
        Password:req.body.Password
    },{new: true})
    .then(user=>{
        if(!user){
            return res.status(400).send({
                message:"User Not Found with Given UserId"+req.param.UserId
            });
        }
        res.send(user);
    }).catch(err=>{
        if(err.kind=='ObjectId'){
            return res.status(404).send({
                message:"User Not Found with Given UserId"+req.param.UserId
            });
        }
        return res.status(500).send({
            message:"Error updaing user"+req.param.UserId
        });
    });
   


}

//Deleting any user
exports.delete=(req, res)=>{
   User.findOneAndRemove(req.param.UserId)
   .then(user=>{
       if(!user){
            return res.status(404).send({
                message:"User not Find with Given User Id"+req.param.UserId
            });
       }
            res.send({
                message:"Note Deleted successfully"
                });
            }).catch(err=>{
                if(err.kind==='ObjectID' ||err.name==='not Found'){
                    return res.status(404).send({
                        message:"User not Find with Given User Id"+req.param.UserId
                    }); 
                }
                    return res.status(500).send({
                    message: "Could not delete note with Userid " + req.params.UserId
            });
        
   });


};