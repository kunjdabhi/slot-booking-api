const Dean = require('../Model/Dean');
const bcrypt = require('bcrypt');
const {v4:uuidv4} = require('uuid');
const Token = require('../Model/Token');

const deanRegister = async(req,res)=>{
    const {universityId, password} = req.body;
    try{
        if(!universityId || !password ){
            throw new Error("Provide universityId and password both fields");
        }
        const alreadExist = await Dean.findOne({universityId});
        
        if(alreadExist){
            throw new Error("Dean already exist with this universityId")
        }else {
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            
            const dean = await Dean.create({
                universityId,
                password:hash
            })
            return res.status(200).json(dean);
        }

    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

const deanLogin = async(req, res)=>{
    const {universityId, password} = req.body;
    try{
        if(!universityId  || !password){
            throw  new Error ("Please provide your credentials");
        }
        const dean = await Dean.findOne({universityId});

        if(!dean){
            throw new Error("Dean does not exist with given universityID");
        }

        const match = await bcrypt.compare(password, dean.password);
        if(!match) {
            throw new Error("Invalid Password");
        }

        const uuid = uuidv4();
        let token = await Token.findOne({universityId});

        if (!token) {
          token = new Token({
            universityId: universityId,
            token: uuid,
          });
        } else {
          token.token = uuid; 
        }
    
        await token.save();
        return res.status(200).json({
            dean,
            token:uuid
        })

    } catch(e){
        res.status(400).json({
            msg:e.message
        })
    }
}


module.exports= { deanRegister, deanLogin}