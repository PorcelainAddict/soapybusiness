import mongoose from 'mongoose'
const connection = {}

async function connectDb() {
    if (connection.isConnected) {
        //use existing db connection 
        // console.log("using exisiting connection")
        return;
    }
  //use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // console.log("DB CONNECTED")
    connection.isConnected = db.connections[0].readyState;
}

export default connectDb;