const {Router} = require("express")
const UserModel = require("./Login.model");


const authRouter = Router();





authRouter.post("/signup", async(req, res) => {
    console.log(req.body)
    UserModel.findOne({"email":req.body.email},function(err,result){
        if(result){
            res.send("you are registered with this email")
        }
        else{
            const user = new UserModel(req.body)
            user.save((err, success) => {
            if(err){
                res.status(500).send({message : "Error occurred"})
            }
        return res.status(201).send({message : "Sign up success",data:user})
    }); 
        }
})
})

authRouter.post("/login", async (req, res) => {
    console.log(req.body.email) 
    try {
        
        UserModel.findOne({"email":req.body.email},function(err,result){
            if(!result){
                res.send("wrong email")
            }
            else{                    
                if(result.password!==req.body.password){
                    res.send("wrong password")
                }
                else{
                    res.send(result)
                } 
            }
        })
        
        
        
        // if(!user)
        // return res.status(401).send({msg:'invalid'})

        // const password= await UserModel.findOne({$and:[{email:req.body.password},{email:req.body.email}]})
        // console.log(password)
        
        // if(password===null)
        // return res.status(401).send({msg:'invalid'})
        // return res.send(user)
        // return res.status(200).send({msg:'success',id:password._id})


    } catch (e) {

        res.status(500).send("invalid")
    }  
})

module.exports = authRouter;