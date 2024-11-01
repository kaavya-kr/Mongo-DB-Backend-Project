const express = require('express');
// const db =require('./util/database');
const bodyParser = require('body-parser');
const app =express();
const mongoConnect = require('./util/database').mongoConnect;
const userRoutes=require('./routes/routes');
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
 app.use('/api/v1',userRoutes);

 
 mongoConnect(() => {
    
    app.listen(3000); 
});