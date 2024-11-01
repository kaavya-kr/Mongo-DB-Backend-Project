const mongodb= require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://mongotest:xIhvsFMsoPhng1Ce@cluster0.ysddy.mongodb.net/test')
.then(client => {
    console.log('Connected');
    _db=client.db();
    callback();
})
.catch(err => {
    console.log(err);
    throw err;addEventListener
});
};

const getDb=() => {
    if(_db){
        return _db;   //return access to db 
    }
    throw 'No database found';
};



// module.exports=mongoConnect
exports.mongoConnect = mongoConnect;
exports.getDb= getDb;