const mongodb= require('mongodb');

const getDb=require('../util/database').getDb;
module.exports= class product {
    constructor(productName,description,price,productId,imageBase64){
        this.productName = productName;
        this.description=description;
        this.price =parseInt(price) ;
        this.productId=parseInt(productId);
        this.imageBase64 = imageBase64;
    }
     async save() {
        try{
        const db=getDb();
        const dbOp = await db.collection('products').insertOne(this); 
            return {productName:this.productName,
                description:this.description,
                price:this.price,
                productId:this.productId,
                imageBase64: this.imageBase64
             }
        }catch(err){
            console.log(err);
            return err;
        }
     }
     static checkProductExist = async (productId) =>{
        const db=getDb();
       const checkProduct= await db.collection('products').find({"productId":parseInt(productId)}).toArray();
       return checkProduct;
    }
    static fetchAll= async(page,ITEMS_PER_PAGE) => {

             
        try{
            const db =getDb();
            const skip = (page-1) * ITEMS_PER_PAGE;
            const productFetch= await db.collection('products').find().skip(skip).limit(ITEMS_PER_PAGE).toArray();
            return productFetch;
        }
       catch(err){
    console.log(err);
    return err;
       }
    }
    static findByPk= async (productId) => {
        // console.log('hi');
        // console.log(`my productId is ${productId}`);
        try{
        const db = getDb();
        const findById=await db.collection('products').findOne({"productId":parseInt(productId)});
        return findById;
        // .then(user =>{
        //     return user
        // } )
        }catch(err){
            console.log(err);
            return err;
        }
    }

    static deleteOneProduct = async(productId) => {
        try{
            const db = getDb();
            const deleteProduct=await db.collection('products').deleteOne({"productId":parseInt(productId)});
            return {"message":"Product Deleted"};
        }catch(err){
            console.log(err);
            return err;
        }
    }
    static updateProductFetch = async(productId,productName,description,price) => {
        try {
            const db = getDb();
           const productUpdate=await db.collection('products').updateOne({"productId":parseInt(productId)},{$set:{productName:productName,description:description,price:price}});
           return {productName:productName,
            description:description,
            price:price
           
        }
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    static async updateProductAverageRating(productId, averageRating) {
        try {
            const db = getDb();
            await db.collection('products').updateOne(
                { productId: parseInt(productId) },  // Find the product by productId
                { $set: { averageRating: averageRating } }  // Update the averageRating field
            );
        } catch (err) {
            console.log('Error updating product average rating:', err);
            return err;
        }
    }

    static searchByField = async( page, ITEMS_PER_PAGE, searchParams) => {
        try{
            const db = getDb();
            const skip = (page - 1) * ITEMS_PER_PAGE;
            const query = {
                $or: [
                    { productName: { $regex: searchParams, $options: 'i' } }, // Case-insensitive search on name
                    { description: { $regex: searchParams, $options: 'i' } }, // Case-insensitive search on description
                    { price: parseFloat(searchParams) } // Exact match for price if numeric
                ]
            };
            // for (let field in searchParams) {
            //     // Ignore pagination parameters
            //         const searchTerm = searchParams[field];
    
            //         if (field === 'price') {
            //             query[field] = parseFloat(searchTerm); // Convert price to a number
            //         } else {
            //             query[field] = { $regex: searchTerm, $options: 'i' }; // Use regex for string fields
            //         }
            //     }
            console.log('Constructed Query:', query);
            const products = await db.collection('products').find(query)
            .skip(skip)
            .limit(ITEMS_PER_PAGE).toArray();
            return products;
        }catch(err){
            console.error('Model Error:', err);
            throw err;
        }
    }
    static filterByPriceAndRating = async(filters) => {
        try{
            const db = getDb();
        const products = await db.collection('products').find(filters).toArray();
        return products;
    } catch (err) {
        console.error('Model Error:', err);
        throw err;
    }

        }
    }

 


    

