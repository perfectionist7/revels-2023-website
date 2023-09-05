const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const InitiateMongoServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("DB Connection Unsuccessful, URI Missing");
    process.exit(0);
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const disconnectDB = async () => {
  try {
      await mongoose.disconnect();
      console.log("\nMongo disconnected...");
  } catch (err) {
      console.log("Error disconnecting Mongo: ", err);
  }
};

module.exports = { InitiateMongoServer, disconnectDB };
