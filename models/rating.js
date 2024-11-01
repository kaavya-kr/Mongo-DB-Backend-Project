const mongodb= require('mongodb');

const getDb =require('../util/database').getDb;
module.exports= class Rating {
    constructor(productId,userId,rating){
        this.productId=productId;
        this.userId=userId;
        this.rating = rating;
    }
    static addRating = async(productId,userId,rating) => {
        const db= await getDb();
        const ratingData = {
            productId: productId,
            userId: userId,
            rating: rating
        };
        const result = await db.collection('rating').insertOne(ratingData);
        return result;
    
    }
    static async getProductRatings(productId) {
        try {
            const db =  getDb();
            const ratings = await db.collection('rating').find({ productId: parseInt(productId) }).toArray();
            return ratings;
        } catch (err) {
            console.log('Error fetching product ratings:', err);
            return [];
        }
    }
    static  deleteRatingsByProductId = async (productId) => {
        try {
            const db = getDb(); // Assuming `getDb()` gets the MongoDB connection
            const result = await db.collection('rating').deleteMany({productId: parseInt(productId) });
            return result
        } catch (err) {
            console.error('Model Error (Rating):', err);
            throw err;
        }
    };
}