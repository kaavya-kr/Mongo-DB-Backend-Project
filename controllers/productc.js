const {productCreate,productFetch,getProduct,deleteProductById,productUpdate,getProductWithAverageRating,searchProduct,filterProducts}=require('../service/productService')
const product = require('../models/productm');

exports.postProduct=async(req,res,next) => {
    // console.log('hi');
        try{
            console.log(JSON.stringify(req.body),'incoming data');
            const{
                productName,
                description,
                price,
                productId
            } =req.body;
            let imageBase64 = null;
        if (req.file) {
            const imageBuffer = req.file.buffer; // Get the buffer from the uploaded file
            imageBase64 = imageBuffer.toString('base64'); // Convert buffer to base64
        }
            const productData = await productCreate(productName,description,price,productId,imageBase64);
            // console.log('producatdata',productData)
            res.send(productData);
        }catch(err){
            console.log(err);
        }
}
const ITEMS_PER_PAGE=2;
exports.getProduct=async(req,res,next) => {
    // console.log('hi')
    try{
        const page = parseInt(req.query.page) || 1;
        const products =await productFetch(page,ITEMS_PER_PAGE);
        // console.log('this is a product get method ')
        res.send(products);
    }catch(err){
        console.log('error',err)
    }
}

exports.getProductById=async(req,res,next) => {
    const productId=req.params.productId
    // console.log(productId);
    try {
        // console.log('hi');
        // console.log(productId);
        const productData=await getProduct(productId)
        // console.log("productData",productData)
         res.send(productData);
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.deleteProduct=async(req,res,next) => {
    try {
        const productId = req.params.productId
        // console.log('hi')
        const deleteProduct=await deleteProductById(productId)
        res.send(deleteProduct)
    //    console.log('deleted')       
    } catch (err) {
        console.log(err)
        return err
    }
}

exports.updateProductById= async(req,res,next) => {
    const productId= req.params.productId
    const {productName,description,price}= req.body;
    try{
        const productFieldData=await productUpdate(productId,productName,description,price);
        res.send(productFieldData)
        }catch(err){
            console.log(err);
            return err;
        }
}


exports.getProductRating = async(req,res,next) => {
    try{
    const productId= req.params.productId
    const productData = await getProductWithAverageRating(productId);
    res.status(200).json({
        message: 'Product fetched successfully',
        product: productData
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
}
};

exports.searchProducts= async(req,res,next) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const searchParams = req.query.search;
        const ITEMS_PER_PAGE = 5;
        
        console.log('Search Params:', searchParams); 
        const products = await searchProduct(page, ITEMS_PER_PAGE,searchParams);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    }catch(err){
        console.error('Error searching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.filterByPriceAndRating= async(req,res,next) => {
    try {
        const { minPrice, maxPrice, minRating } = req.query;

const products = await filterProducts(minPrice,maxPrice,minRating);

if (products.length === 0) {
    return res.status(404).json({ message: 'No products found' });
}

res.json(products);
} catch (err) {
console.error('Error filtering products:', err);
res.status(500).json({ message: 'Server error' });
}
};