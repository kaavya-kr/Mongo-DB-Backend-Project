
const cart = require('../models/cartm')
const {cartCreate}=require('../service/cartService')
// const cartFetch=require('../service/cartService');

exports.postCart=async(req,res,next) =>{
    // // console.log('hi');
 
   
    try{
        console.log(JSON.stringify(req.params),'incoming data');
        const id=req.params.userId

        const {
            productId,
            quantity,
            cartId
        }=req.body;
        const cartData = await cartCreate(id,productId,quantity,cartId);
        res.send(cartData);
    }catch(err){
        console.log(err)
    }
}
// exports.getCart=async(req,res,next) => {
//     try{
//         const cart = await cartFetch();
//         console.log('this is cart get method');
//         res.send(cart);
//     }catch(err){
//         console.log(err);
//     }
// }
// exports.postAddCart=async(req,res,next) => {
//     // console.log('hi')
//     try{
//         const userId=req.params.userId
//         const{
//             productId,
//             quantity
//         }=req.body;
//         console.log('hey its from controller')
//         //add service
//         const cartAdd=await addCart(userId,productId,quantity)
//         console.log(cartAdd)
//         res.send(cartAdd)
//     }catch(err){

//     }
// }
// exports.deleteCart =async(req,res,next) => {
//     try {
//         const productId=req.query.productId
//         const userId = req.params.userId
//         // console.log('hi')
//         const deleteCarts=await deleteAllCarts(productId,userId)
//         // console.log("delete cart item")
//        res.send({deleteCarts})
//        console.log('deleted')       
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// }

// exports.cartById=async(req,res,next) => {
//     // console.log('hi');
    
//     try {
//         const userId =req.params.userId; 
//         const cartitems = await cartDetails(userId)
//         console.log(cartitems)
//         res.send(cartitems) 
//     } catch (err) {
//         console.log(err)
//     }
// }