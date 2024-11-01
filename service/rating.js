const Product = require('../models/productm');
const Rating = require('../models/rating');
const user = require('../models/userm');

exports.addProductRating =async(productId,userId,rating) => {
    try {
        const userData = await user.checkUserExist(userId);
        const productData = await Product.checkProductExist(productId);

        if (!userData || userData.length === 0) {
            return{"message":"User not exist"}
        }
      
    
        else if (!productData || productData.length === 0) {
            return{"message":"Product not exist"}
        }else{
            await Rating.addRating(productId,userId,rating);
        }
        return {
            productId: productId,
            // averageRating: averageRating,
            userRating: rating
        };
        // console.log('hi');
    } catch (err) {
        console.log(err)
        
    }
    
}

exports.getProductRating=async(productId) => {
try {
    const productRating= await Rating.getProductRatings(productId);
    return productRating
} catch (err) {
    console.log(err)
}
}