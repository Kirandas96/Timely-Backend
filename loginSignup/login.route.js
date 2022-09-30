const {Router} = require("express");
const createToken = require("../utils/createToken");
const UserModel = require("./Login.model");


const authRouter = Router();





authRouter.post("/signup", async(req, res) => {
    console.log(req.body)
    UserModel.findOne({"email":req.body.email},function(err,result){
        if(result){
            res.send({message:"you are registered with this email"})
        }
        else{
            const user = new UserModel(req.body)
            user.save((err, success) => {
            if(err){
                res.status(500).send({message : "Error occurred"})
            }
        return res.status(201).send({message : "Sign up success",data:user.name})
    }); 
        }
})
})

authRouter.post("/login", async (req, res) => {
    console.log(req.body.email) 
    try {
        
        UserModel.findOne({"email":req.body.email},function(err,result){
            if(!result){
                res.send({message:"wrong email"})
            }
            else{        
                const match=result.checkPassword(req.body.password)            
                if(!match){
                    res.send({message:"wrong password"})
                }
                else{
                    const token=createToken(result)
                    res.send({message:"login successfull",data:result.name,token})
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