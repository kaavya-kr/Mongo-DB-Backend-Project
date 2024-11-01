const mongodb= require('mongodb');
const getDb=require('../util/database').getDb;
const bcrypt=require('bcryptjs')
// const ObjectId = mongodb.ObjectId;

module.exports =class user{
   
             constructor(firstName,lastName,email ,id,password,type,phoneNumber,createdAt,updatedAt){
                 this.firstName = firstName;
                 this.lastName=lastName;
                 this.email = email;
                 this.id =id;
                 this.password=password;
                 this.type=type;
                 this.phoneNumber = phoneNumber;
                 this.createdAt=createdAt;
                 this.updatedAt=updatedAt;
             }
              async save(){
                const db=getDb();
                this.createdAt = new Date(); 
                this.updatedAt = new Date(); 
                const hashedPassword=await bcrypt.hash(this.password, 12)
                this.password=hashedPassword;
                try{

                const dbData = await db.collection('users').insertOne(this); 
                    return {firstName:this.firstName,
                        lastName:this.lastName,
                        email:this.email,
                        id:this.id,
                        password:this.password,
                        type:this.type,
                        phoneNumber:this.phoneNumber,
                        createdAt: this.createdAt,  
                    updatedAt: this.updatedAt
                    };
                }catch(err){
                    console.log(err);
                    return err;
                }
             }

            // static checkUserExist(id){
            //     const db=getDb();
            //     return db.collection('users').find({"id": id}).toArray()
            // }
            static checkEmailExist=async (email) => {
                const db=getDb();
                const checkEmail=await db.collection('users').find({"email":email}).toArray();
                return checkEmail;
            }
              static checkUserExist=async (id,email) => {
                const db=getDb();
                const checkUser=await db.collection('users').findOne({$or : [{"id":parseInt(id)},{"email":email}]})
                return checkUser;
            }
             static fetchAll=async() =>{

             
                try{
                    const db =getDb();
                    const userFetch=await db.collection('users').find().toArray()
                    return userFetch;
                }
               catch(err){
            console.log(err);
            return err;
               }
            }
            static fetchById=async(id ) => {
                // console.log(`my id is ${id}`);
                try{
                const db = getDb();
                const findById=await db.collection('users').findOne({"id":parseInt(id)});
                return findById
                }catch(err){
                    console.log(err);
                    return err;
                }
            }
            static  findOneAndDelete= async(id) => {
                try{
                    const db = getDb();
                    const deleteUser=await db.collection('users').findOneAndDelete({"id":parseInt(id)});
                    return deleteUser;
                }catch(err){
                    console.log(err);
                    return err;
                }
            }
            static updateUser= async(id,firstName,lastName) => {
                try {
                    const db = getDb();
                    const filterQuery = {"id":parseInt(id)}

                    const setQuery = {updatedAt:new Date()};
                    if(firstName){
                        setQuery.firstName = firstName
                    }
                    if(lastName){
                        setQuery.lastName = lastName
                    }
                    
                    // const updateQuery = {$set:{firstName:firstName,lastName:lastName,email:email}}
                    const updateQuery = {$set:setQuery}
                    // upsert = upsert or insert
                   const userUpdate=await db.collection('users').updateOne(filterQuery,updateQuery)//{upsert:true});

                   console.log('userUpdate', JSON.stringify(userUpdate))
                //    if(userUpdate.acknowledged){
                    return {firstName:firstName,
                    lastName:lastName
                    //   }
                }
                } catch (err) {
                    console.log(err);
                    return err;
                }
            }
            static loginUser=async(email,password) => {
                try{
                    const db=getDb();
                    const loginData= await db.collection('users').findOne({'email':email});
                    if (!loginData) {
                        return null; 
                    }
                    const passwordCheck=await bcrypt.compare(password,loginData.password)
                    return loginData;
                }catch(err){
                    console.log(err);
                    return err;
                }
            }
    
        }
        


// static getEmail = async(email) => {
//     console.log('from model layer email',email);
//     try{
//     // const a=('from model layer email',email);
//     // return a;
//     //add sql query
//     const emailData=await db.execute('SELECT * FROM user WHERE email=?',[email])
//     console.log('model layer emailData:',emailData);
//     return emailData[0];
   
// }catch(err){
//     console.log('model layer error',err);
//     return err;
// }
// }


// static createNewUser=async(firstName,lastName,email) => {
// //  console.log('model layer user creation')
// try{
//     const userData =await db.execute('INSERT INTO user(firstName,lastName,email)values(?,?,?)',[firstName,lastName,email])
//     // console.log(userData);
//     return userData[0];
// }catch(err){
//     console.log('model layer error',err);
//     return err;
// }
//  }



// static userEmail = async(userId) => {
//     console.log('from model layer email')
//     try{
//         const emailGet = await db.execute('SELECT email FROM user WHERE userId= ?' , [userId])
//         // console.log('helloooo')
//         // console.log(emailGet)
//         return emailGet[0];
//     }
//     catch(err){
//         console.log(err)
//         return err;
//     }
//  }
// }
