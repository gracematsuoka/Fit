const mongoose = require("mongoose");

// connect node to mongodb database
mongoose.connect("mongodb://localhost:27017/outfit_finder")
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