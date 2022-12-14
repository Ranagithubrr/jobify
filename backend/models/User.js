import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        validator:{
            validator:validator.isEmail,
            message:"please provide a valid email"
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide password'],
        minlength: 6,
        select:false
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 20,
        default: ''
    },
    location: {
        type: String,
        trim: true,
        maxlength: 40,
        default: ''
    },
    bloodgroup: {
        type: String,
        trim: true,
        maxlength: 40,
        default: ''
    },
    about: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ''
    },
    education: {
        type: String,
        trim: true,
        maxlength: 40,
        default: ''
    },
    phone: {
        type: Number,
        trim: true,
        maxlength: 11,
        default: ''
    },
    title: {
        type: String,
        trim: true,
        maxlength: 40,
        default: ''
    },
    skills:{
        type:Array,
        default:[],
    },
    photo:{
        type:String,
        default:'',
    }
});


UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET,  {expiresIn: process.env.JWT_LIFETIME})
};

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


export default mongoose.model('User', UserSchema)