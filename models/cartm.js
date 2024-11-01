const db= require('../util/database');
// const user = require('./userm');
const getDb=require('../util/database').getDb;


module.exports= class cart {
    constructor(id,productId,quantity,cartId){
        this.id=id;
        this.productId = productId;
        this.quantity = quantity;
        this.cartId = cartId;

    }
    static createCart =async(id,productId,quantity,cartId)=> {
        // console.log('model layer creation');
        try{
            const db=getDb();
            let dbOp;
                dbOp =db.collection('carts').insertOne(this); 
                return {
                    productId:this.productId,
                    quantity:this.quantity,
                    cartId:this.cartId
                };
            }catch(err){
                console.log(err);
                return err;
            }
       
    }
    static fetchAll=async ()=> {
        try{
            const cartData= await db.execute('SELECT cart.*,product.price,(product.price*main.cart.quantity) AS totalPrice FROM cart JOIN product ON product.productId=cart.productId;');
            console.log(cartData[0])
            return cartData[0];
        }
       catch(err){
    console.log(err);
    return err;
       }
     }
     static getCart = async(userId,productId) => {
        try{
            const getCarts=await db.execute('SELECT * FROM cart WHERE userId=? AND productId=?',[userId,productId]);
            console.log(getCarts)
            console.log('model-adding cart')
            return getCarts[0];
        }catch(err){
            console.log('model layer getcarts error',err)
            return err;
        }
     }
     static updatedCart = async(userId,productId,quantity) => {
        try{
            const updatedCarts=await db.execute('UPDATE cart SET quantity=? WHERE userId=? AND productId=?',[quantity,userId,productId])
            return updatedCarts;
        }catch(err){
            console.log('model layer updatedcarts error',err)
            return err;
        }
     }
     static deleteCartItem = async(productId) => {
        console.log('from model layer delete')
        try{
            const deletecarts= await db.execute('DELETE FROM cart WHERE productId=?',[productId])
            // console.log('helloooooo');
            return deletecarts[0];
        }catch(err){
            console.log('model layer deletecarts error',err)
            return err;
        }
     }
     static fetchCartItems= async(userId) => {
        console.log("--cart details--")
        try{
            console.log('hai')
            const fetchCart=await db.execute(`SELECT 
                c.cartid,
                c.productId,
                p.productName AS productName,
                p.price as price,
                c.quantity,
                (p.price * c.quantity)AS totalPrice,
                u.email AS email
                FROM cart c 
                JOIN product p ON c.productId = p.productId 
                JOIN user u ON c.userId=u.userId where c.userId=?`,[userId])
            // console.log(cartItems)
            // console.log(fetchCart)
            return fetchCart[0];
            // return ('hi');
        }catch(err){
         console.log(err)
         return err;
        }
    } 
   
}