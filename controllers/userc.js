const { parsePhoneNumberFromString } = require('libphonenumber-js');
const user = require('../models/userm');
const { validationResult } = require('express-validator')
const {userCreate,userFetch,getUser,deleteUserById,userUpdate} = require('../service/userService');
const UserRole = Object.freeze({
    USER: 'user',
    ADMIN: 'admin',
    OWNER: 'owner'
});


exports.postUser= async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        console.log((req.body),'Incoming data');
        const{
            firstName,lastName,email,id,password,type,phoneNumber
        }= req.body;
        const pNumberObj = parsePhoneNumberFromString(phoneNumber);
        if (!pNumberObj || !pNumberObj.isValid()) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }
        if(!Object.values(UserRole).includes(type)){
            return res.status(400).json({message:`Invalid Type.only use:${Object.values(UserRole).join(',')}`});
        }
        // //add service
    
        const userData = await userCreate(firstName,lastName,email,id,password,type,phoneNumber);
        res.send(userData);
        return userData
    }catch(err){
        console.log(err);
    }
}


exports.getUser=async(req,res,next)=> {
    // console.log('hi')
    try
{

//add service
const users = await userFetch(); 
console.log('this is a get method')
// return products
res.send(users);
}catch(err){
console.log('error',err)
}
}

exports.getUserById=async(req,res,next) => {
    const id=req.params.userId
    // console.log(userId);
    try {
        // console.log('hi');

        // console.log(id);
        const userData=await getUser(id)
        console.log(userData)
        res.send(userData);
    } catch (err) {
        console.log(err);
    }
}
exports.updateUser= async(req,res,next) => {
    const id= req.params.userId
    const {firstName,lastName,email}= req.body;

    try{
        const userFieldData=await userUpdate(id,firstName,lastName,email);
        res.send(userFieldData)

    }catch(err){
        console.log(err);
        return err;
        
    }
}
exports.deleteUser =async(req,res,next) => {
    try {
        
        const id = req.params.userId
        // console.log('hi')
        const userDelete=await deleteUserById(id)
        
       res.send(userDelete)
    //    console.log('deleted')       
    } catch (err) {
        console.log(err)
        return err
    }
}

