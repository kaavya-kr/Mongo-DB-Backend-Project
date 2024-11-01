const product = require('../models/productm')
const Rating = require('../models/rating');

const productCreate= async(productName,description,price,productId,imageBase64) => {
    // console.log('hi its service layer');
    const newProduct = new product(productName,description,price,productId,imageBase64)
   

    try{
        //add model
        
        const productExist = await product.checkProductExist(productId);
        // console.log(userExist.length);
        if (productExist.length > 0) {
            return {"message": "Product Already Exist"};
        } else {
            const productData= await newProduct.save();
         return productData;
        }
         


        }catch(err){
     console.log(err);
     return err;
 }
}

const productFetch = async(page,ITEMS_PER_PAGE) => {
    try{
        const productDetails = await product.fetchAll(page,ITEMS_PER_PAGE)
        console.log('hi this is productfetch')
        // console.log(productDetails)
        return productDetails;
        
    }catch(err){
        console.log(err);
        return err;
    }


}
const getProduct = async(productId) => {

    try{

        // const newProduct = new product(productId)
    const productGet= await product.checkProductExist(productId)
    // console.log('productGet:', productGet);
         if (productGet.length > 0) {
            // console.log('hi')
            const productData= await product.findByPk(productId);
            const ratings = await Rating.getProductRatings(productId);
            if (ratings.length > 0) {
                const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
                const averageRating = totalRating / ratings.length;
                await product.updateProductAverageRating(productId, averageRating);
                // productData.averageRating = averageRating.toFixed(2); // Add average rating to the product details
                return {
                    ...productData,
                    averageRating: averageRating.toFixed(2), // Optional: Round to 2 decimal places
                };
            } else {
                return {
                    ...productData,
                    averageRating: 'No ratings yet',
                };
            }

            // return productData;
           
        } else {
            return {"message": "Product Not Exist"};
         
        }
    }catch(err){
        console.log('service layer error',err)
    }
 }   
 const deleteProductById = async(productId) => {
    // console.log('from service delete');

    try{
        
        // const newUser = new user(id)
        const ifProductExist = await product.checkProductExist(productId);
        if(ifProductExist.length > 0){
            const productDeleteData= await product.deleteOneProduct(productId)
            const deleteratingData = await Rating.deleteRatingsByProductId(productId);
            return{productDeleteData,deleteratingData}
        }else{
            return {"message":"Product not Exist"}
        }
        
    }catch(err){
        console.log(err)
        return err;
    }
}
const productUpdate = async(productId,productName,description,price) => {
    try{
        const ifUserExist=await product.checkProductExist(productId);
        if(ifUserExist.length>0){
            const userUpdate=await product.updateProductFetch(productId,productName,description,price)
            return userUpdate;
        }else{
            return {"message":"Product not Exist"}
        }
        // return updateUser;
    }catch(err){
    console.log(err)
    }
    }

  const getProductWithAverageRating = async(productId) => {
    try {
        const productData = await product.findByPk(productId);
        if (!productData) {
            throw new Error('Product not found');
        }

        return productData;
    }catch(err){
    console.log(err)
    }
  }

  const searchProduct = async ( page, ITEMS_PER_PAGE, searchParams) => {
    try {
        console.log('Searching products with params:', { page, ITEMS_PER_PAGE, searchParams });
        const products = await product.searchByField(page, ITEMS_PER_PAGE, searchParams);
        return products;
    } catch (error) {
        console.error('Service Error:', error);
        throw error;
    }
};

const filterProducts= async(minPrice,maxPrice,minRating) => {
    const filters = {};

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    if (minRating) {
        filters.averageRating = { $gte: parseFloat(minRating) };
    }

    try {
        const products = await product.filterByPriceAndRating(filters);
        return products;
    } catch (err) {
        console.error('Service Error:', err);
        throw err;
    }
};



module.exports={productCreate,productFetch,getProduct,deleteProductById,productUpdate,getProductWithAverageRating,searchProduct,filterProducts};
