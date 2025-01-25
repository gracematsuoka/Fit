const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
console.log("mongo uri: " + mongoURI)

mongoose.connect(mongoURI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((error) => {
    console.log("failed to connect:", error);
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    authType: {
        type: String,
        enum: ["email", "google"],
        required: true
    },
    aesthetic: {
        type: Object
    },
    birthday: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    }   
});


const User = new mongoose.model("User", userSchema);

module.exports = User;