const Token = require('../Model/Token')

const isAuth = async (req,res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            msg:"not authorized"
        })
    }
    try{

        const token = authorization.split(' ')[1];
        
        const user = await Token.findOne({token});
        if(!user){
            throw new Error("You must be logged in");
        }

        if(user.token === token) {
            req.id = user.universityId;
            next();
        }
    } catch(e){
        return res.json(401).json({
            msg:e.message
        })
    }
}

module.exports = {isAuth};