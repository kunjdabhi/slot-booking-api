const bcrypt = require('bcrypt');
const Student = require('../Model/Student');
const Token = require('../Model/Token');
const {v4:uuidv4} = require('uuid');


const registerStudent = async (req,res)=>{
    const {name, universityId, password} = req.body;
    try{
        const alreadExist = await Student.findOne({universityId});
        if(alreadExist){
            throw new Error("Student already exist with this universityId")
        }

        if(!universityId|| !password ){
            throw new Error("Provide universityId and password both fields");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const student = await Student.create({
            universityId,
            name,
            password:hash
        })
        return res.status(200).json(student);

    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

const loginStudent = async(req, res)=>{
    const {universityId, password} = req.body;
    try{
        if(!universityId  || !password){
            throw  new Error ("Please provide your credentials");
        }
        const student = await Student.findOne({universityId});
        if(!student){
            throw new Error("Student does not exist with given universityID");
        }

        const match = await bcrypt.compare(password, student.password);
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
            student,
            token:uuid
        })

    } catch(e){
        res.status(400).json({
            msg:e.message
        })
    }
}


module.exports = {registerStudent,loginStudent}