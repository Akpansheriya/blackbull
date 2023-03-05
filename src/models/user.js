const mongoose = require("mongoose");
const validator = require("validator");


const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim:true,
        minLength: 3,
        maxlength:30
    },
    email : {
        type: String,
        required: true,
        trim:true,
        maxlength:30,
        validate(value){
            if(!validator.isEmail(value)){
                throw new message("invalid email id")
            }
        }

    },
    phone : {
        type: Number,
        trim:true,
        required: true,
        min:10,
        notEmpty: true,
        errorMessage: "Phone number cannot be empty"
        
    },
    course : {

        type:String,
        // enum: ["Nodejs","Flutter","Laravel","Kotlin","Reactjs","Reactnative","IOS","Android"],
        //  default:"Nodejs",
        required:true,
        trim:true
        // required:true
        // type:String,
        // Flutter: String,
        // Nodejs: String,
        // Reactjs: String,
        // Kotlin: String,
        // reactnative:String,
        // IOS: String,
        // Android: String,
        // Laravel: String,
        //  required: true,
    },
     message : {
        type: String,
        trim:true,
        required: true,
        minLenght: 3,
        maxlength:150
    },
    date : {
        type: Date,
        default: Date.now


    }
   
});

module.exports = UserModel = mongoose.model("UserModel",UserSchema);