const jwt = require('jsonwebtoken');

const user = require('../service/auth');


exports.postLogin = async (req,res,next) => {
    const{
        email,password
    }= req.body;
    try{
    const userLogin = await user.checkLogin(email,password);
    console.log(userLogin)
    if(!userLogin){
        return res.status(401).json({message:'Aunthentication failed.User not found'});
    }
    const token = jwt.sign({
        email:userLogin.email,
        id:userLogin._id.toString(),
        role: userLogin.type  //default 
    },
    'heystar',
    {expiresIn:'1h'});
    return res.status(200).json({
        token:token,
        id:userLogin._id.toString(),
        
    });
    }catch(err){
        console.log(err);
    }
    };