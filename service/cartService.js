const cart = require('../models/cartm')
const user =require('../models/userm')
const cartCreate= async(id,productId,quantity,cartId) => {
    // console.log('hi its service layer');
    // console.log('hi its service layer',productId);
    // // console.log('hi its service layer',userId);
    // console.log('hi its service layer',quantity);
try{
    const cartDetails=await cart.createCart(id,productId,quantity,cartId);
   
    console.log('cartdetails in server layer',cartDetails)
     return cartDetails;
    // if(cartDetails ){           
    //     const cartResponse = {
            
    //         productId:productId,
    //         // userId:userId,
    //         quantity:quantity
    //     }

    //     console.log('cartresponce',cartResponse);
    //     return cartResponse;
    // }else{
    //     const response={message:'something went wrong'};
    //     return response;
        
    // }
}catch(err){
console.log(err);
return(err);
}
}
const cartFetch=async() => {
    try{
        const cartDetails=await cart.fetchAll()
        console.log('cartdetails working service');
        return cartDetails
    }catch(err){
        console.log(err);
        return err; 
    }
}
const addCart= async(userId,productId,quantity)=> {
    // console.log('hellooo')
    try{
        const existingCartItems=await cart.getCart(userId,productId,quantity);
        console.log('existing this in service layer',existingCartItems);
       
        if(existingCartItems.length>0){
            console.log('want to update')
            const updatedCart=await cart.updatedCart(userId,productId,existingCartItems[0].quantity+quantity)
            return updatedCart;
            
        }else{
            const newCartItems=await cart.createCart(userId,productId,quantity);
        console.log('existing this in service layer',newCartItems);
        return newCartItems;
        
    }
}catch(err){
        console.log(err);
    }
}
const deleteAllCarts = async(productId) => {
    console.log('from service delete');

    try{
        const deleteItem=await cart.deleteCartItem(productId);
        console.log('existing this in service layer',deleteItem);
        // return existingCartItems;
        return deleteItem[0];
    }catch(err){
        console.log(err)
        return err;
    }
}
const cartDetails = async(userId) => {
    try{
    const cartDetails=await user.userEmail(userId);
    // console.log("cart details",cartDetails[0].email)

    console.log('cartdetails working')
    if(cartDetails.length>0 && cartDetails[0].email)
        {
            const cartItems = await cart.fetchCartItems(userId)
            console.log('--fetch cart details--')
            const userDetails={email:cartDetails[0].email,cartItems:cartItems}
            return userDetails

            console.log(cartItems)
        return cartItems;
    }
    // return cartDetails;
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports={cartCreate};

