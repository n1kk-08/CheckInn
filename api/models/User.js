import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true
    },
    email: {
        type : String,
        required : true,
        unique :true
    },
    image:{
        type: String,
    },
    country:{
        type:String,
        required: true
    },
    city : {
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true,
    },

    password: {
        type : String,
        required : true,

    },
    isAdmin: {
        type : Boolean,
        default:false
    }
}, {timeStamps : true})


export default mongoose.model("User", UserSchema)