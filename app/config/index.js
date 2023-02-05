
const config ={
    app:{
        port: process.env.PORT || 2410,
    },
    db:{
        uri:"mongodb://127.0.0.1:27017/contactbook"
    }
};
module.exports = config;