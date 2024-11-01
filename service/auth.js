const user=require('../models/userm')

exports.checkLogin=async(email,password) =>{
    try{
        const userLogin=await user.loginUser(email,password);
        if(!userLogin){
            return null;
        }
        return userLogin;
    }catch(err){
        console.log(err);
        return err;
    }
}