const MongoClient = require('mongodb').MongoClient;
let db;

const connectDB = async() => {
    try {
        MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err, client) => {
            if (err) throw err;
            db = client.db(process.env.MONGODB_NAME)
            console.log(`Connected MongoDB: ${process.env.MONGODB_URL}`)
            console.log(`Database: ${process.env.MONGODB_NAME}`)
          })
    } catch(err) {
        console.log(err);
    }
}

module.exports = {connectDB};