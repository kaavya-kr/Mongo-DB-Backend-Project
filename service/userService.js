

const user=require('../models/userm')
const userCreate= async(firstName,lastName,email,id,password,type,phoneNumber) => {
    // console.log('hi its service layer');

    try{
        //add model
        
        const newUser = new user(firstName,lastName,email, id,password,type,phoneNumber)
        const userExist = await user.checkUserExist(id,email);
        // const emailExist=await user.checkEmailExist(email)
     
        if (userExist) {
            return {"message": "UserId or Email Already Exist"};
        } else {
            const userData= await newUser.save();
        
         return userData;
        }
        }

    catch(err){
        console.log(err);
        return err;
    }
}

const userFetch = async()=> {
    try{
        const userDetails=await user.fetchAll()
        console.log('userView working service');
        return userDetails

    }catch(err){
        console.log(err);
        return err; 
    }
}

 const getUser = async(id,email) => {
    try{
    const getuserData= await user.checkUserExist(id,email)
    if(getuserData){
    console.log('hiiiiii',getuserData)
        
        const userData= await user.fetchById(id)
        return userData
    }else{
        return {"message":"User not Exist"}
    }
    }catch(err){
        console.log('service layer error',err)
    }
 }   
 const deleteUserById = async(id) => {
    // console.log('from service delete');

    try{
            const userDeleteData= await user.findOneAndDelete(id);
            if (userDeleteData){
            return {"message":"User Deleted"};

            }
        else{
            return {"message":"User not Exist"}
        }
        
    }catch(err){
        console.log(err)
        return err;
    }
}
const userUpdate = async(id,firstName,lastName) => {
try{
   
        const userUpdate=await user.updateUser(id,firstName,lastName)
        return userUpdate;
    // }else{
    //     return {"message":"User not Exist"}
    // }
    // return updateUser;
}catch(err){

}
}

module.exports={userCreate,userFetch,getUser,deleteUserById,userUpdate};
