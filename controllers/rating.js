const {addProductRating,getProductRating} = require('../service/rating')

exports.addRating= async(req,res,next) => {
    try{
        const { productId,userId, rating } = req.body;
        // const userId = req.userId;
        const ratingData = await addProductRating(productId,userId,rating);
        // res.send('rating submitted succesffully');
        res.status(200).json({
            message: 'Rating submitted successfully',...ratingData});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
 exports.getRating= async(req,res,next) => {
    try{
        const {productId} = req.params;
        const getRatingData= await getProductRating(productId);
        if (getRatingData && getRatingData.length>0) {
            res.status(200).json(getRatingData);
        } else {
            res.status(404).json({ message: 'Product not found or no rating available' });
        }
    }catch(err){
        console.error('Error fetching product ratings:', err);
    }
 }
